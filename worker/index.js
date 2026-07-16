import { createClerkClient } from '@clerk/backend'
import { exercises } from '../src/data/exercises.js'
import { getInjuryById } from '../src/data/injuries.js'

const allExercises = Object.values(exercises).flat()
const exerciseMap = new Map(allExercises.map(item => [item.id, item]))
const allowedCategories = ['warmup', 'stretch', 'strength', 'relax']

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const allowedOrigins = env.FRONTEND_ORIGINS.split(',').map(value => value.trim())
    const cors = {
      'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Vary': 'Origin'
    }
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors })

    try {
      const url = new URL(request.url)
      const userId = await optionalUserId(request, env, allowedOrigins)

      if (request.method === 'POST' && url.pathname === '/plans/generate') {
        if (!userId) await enforceAnonymousLimit(request, env)
        const { profile } = await request.json()
        validateProfile(profile)
        const plan = await generatePlan(profile, env)
        let id = null
        if (userId) {
          id = crypto.randomUUID()
          const injury = getInjuryById(profile.injuryId)
          const title = `${injury?.name || '恢复训练'} · ${new Date().toLocaleDateString('zh-CN')}`
          await env.DB.prepare(
            'INSERT INTO plans (id, user_id, title, profile_json, plan_json) VALUES (?, ?, ?, ?, ?)'
          ).bind(id, userId, title, JSON.stringify(profile), JSON.stringify(plan)).run()
        }
        return json({ plan, id, saved: Boolean(userId) }, 200, cors)
      }

      if (request.method === 'GET' && url.pathname === '/plans') {
        requireUser(userId)
        const result = await env.DB.prepare(
          'SELECT id, title, created_at FROM plans WHERE user_id = ? ORDER BY created_at DESC LIMIT 100'
        ).bind(userId).all()
        return json({ plans: result.results }, 200, cors)
      }

      const match = url.pathname.match(/^\/plans\/([a-zA-Z0-9-]+)$/)
      if (request.method === 'GET' && match) {
        requireUser(userId)
        const row = await env.DB.prepare(
          'SELECT profile_json, plan_json FROM plans WHERE id = ? AND user_id = ?'
        ).bind(match[1], userId).first()
        if (!row) return json({ error: '没有找到该计划' }, 404, cors)
        return json({ profile: JSON.parse(row.profile_json), plan: JSON.parse(row.plan_json) }, 200, cors)
      }

      return json({ error: '接口不存在' }, 404, cors)
    } catch (error) {
      console.error(error)
      const status = error.status || 500
      return json({ error: status === 500 ? '服务暂时不可用，请稍后重试' : error.message }, status, cors)
    }
  }
}

async function optionalUserId(request, env, authorizedParties) {
  if (!request.headers.get('Authorization')) return null
  const clerk = createClerkClient({
    secretKey: env.CLERK_SECRET_KEY,
    publishableKey: env.CLERK_PUBLISHABLE_KEY
  })
  const state = await clerk.authenticateRequest(request, { authorizedParties })
  return state.isAuthenticated ? state.toAuth().userId : null
}

function requireUser(userId) {
  if (!userId) throw Object.assign(new Error('请先登录'), { status: 401 })
}

function validateProfile(profile) {
  if (!profile || !getInjuryById(profile.injuryId)) throw Object.assign(new Error('评估信息不完整'), { status: 400 })
  if (![1, 2, 3, 4, 5].includes(Number(profile.painLevel))) throw Object.assign(new Error('疼痛等级不合法'), { status: 400 })
  if ((profile.additionalInfo || '').length > 800) throw Object.assign(new Error('补充信息过长'), { status: 400 })
}

async function enforceAnonymousLimit(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${ip}:${env.CLERK_PUBLISHABLE_KEY}`))
  const fingerprint = [...new Uint8Array(digest)].map(v => v.toString(16).padStart(2, '0')).join('').slice(0, 32)
  const hour = new Date().toISOString().slice(0, 13)
  await env.DB.prepare(`INSERT INTO anonymous_usage (fingerprint, hour_bucket, request_count)
    VALUES (?, ?, 1) ON CONFLICT(fingerprint, hour_bucket) DO UPDATE SET request_count = request_count + 1`
  ).bind(fingerprint, hour).run()
  const row = await env.DB.prepare('SELECT request_count FROM anonymous_usage WHERE fingerprint = ? AND hour_bucket = ?')
    .bind(fingerprint, hour).first()
  if (row.request_count > 5) throw Object.assign(new Error('游客每小时最多生成 5 次，请稍后再试或登录使用'), { status: 429 })
}

async function generatePlan(profile, env) {
  const injury = getInjuryById(profile.injuryId)
  const catalog = allExercises.map(({ id, name, category, description, sets, reps, duration, rest }) => ({
    id, name, category, description, sets, reps, duration, rest
  }))
  const prompt = `用户评估：${JSON.stringify({ ...profile, injuryName: injury.name })}\n动作库：${JSON.stringify(catalog)}`
  const response = await fetch(`${env.LLM_BASE_URL.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    signal: AbortSignal.timeout(45000),
    headers: { Authorization: `Bearer ${env.LLM_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: env.LLM_MODEL,
      temperature: 0.2,
      max_tokens: 2200,
      stream: true,
      messages: [
        { role: 'system', content: `你是谨慎的居家康复训练规划助手。只能从给定动作库选择动作，绝不能创造新动作ID。根据用户全部信息选择动作并制定计划。疼痛4-5级、进行性麻木无力、大小便异常、明显创伤等情况应设置shouldSeekCare=true并给出就医提示，避免高强度动作。输出严格JSON：{summary:string,frequency:string,duration:string,equipment:string[],dailyTips:string[],safetyNotes:string[],shouldSeekCare:boolean,phases:[{category:"warmup"|"stretch"|"strength"|"relax",name:string,icon:string,exercises:[{id:string,sets?:number,reps?:string|number,duration?:string,rest?:string,reason:string}]}]}。每个ID必须来自动作库，动作总数3-12个。` },
        { role: 'user', content: prompt }
      ]
    })
  })
  if (!response.ok) throw new Error(`模型接口返回 ${response.status}`)
  const raw = response.headers.get('content-type')?.includes('text/event-stream')
    ? await readStreamedContent(response)
    : (await response.json()).choices?.[0]?.message?.content
  const aiPlan = typeof raw === 'string' ? JSON.parse(raw.replace(/^```json\s*|\s*```$/g, '')) : raw
  return hydrateAndValidate(aiPlan, profile)
}

async function readStreamedContent(response) {
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let content = ''
  while (true) {
    const { done, value } = await reader.read()
    buffer += decoder.decode(value || new Uint8Array(), { stream: !done })
    const lines = buffer.split('\n')
    buffer = done ? '' : lines.pop()
    for (const line of lines) {
      const data = line.trim().replace(/^data:\s*/, '')
      if (!data || data === '[DONE]') continue
      try {
        const chunk = JSON.parse(data)
        content += chunk.choices?.[0]?.delta?.content || ''
      } catch {
        // 忽略心跳或非 JSON 的 SSE 行。
      }
    }
    if (done) break
  }
  return content
}

function hydrateAndValidate(input, profile) {
  if (!input || !Array.isArray(input.phases)) throw new Error('模型返回的计划格式不正确')
  const seen = new Set()
  const phases = input.phases.slice(0, 4).map(phase => {
    if (!allowedCategories.includes(phase.category)) throw new Error('模型返回了不支持的训练阶段')
    const selected = (phase.exercises || []).slice(0, 5).map(choice => {
      const base = exerciseMap.get(choice.id)
      if (!base || base.category !== phase.category || seen.has(choice.id)) return null
      seen.add(choice.id)
      return {
        ...base,
        ...(choice.sets ? { sets: Math.min(Number(choice.sets), 5) } : {}),
        ...(choice.reps ? { reps: choice.reps } : {}),
        ...(choice.duration ? { duration: String(choice.duration) } : {}),
        ...(choice.rest ? { rest: String(choice.rest) } : {}),
        reason: String(choice.reason || '')
      }
    }).filter(Boolean)
    return { name: String(phase.name || phase.category), icon: String(phase.icon || '•'), exercises: selected }
  }).filter(phase => phase.exercises.length)
  const count = phases.reduce((sum, phase) => sum + phase.exercises.length, 0)
  if (count < 1 || count > 12) throw new Error('模型选择的动作数量不合理')
  return {
    injuryId: profile.injuryId,
    painLevel: Number(profile.painLevel),
    summary: String(input.summary || ''),
    frequency: String(input.frequency || ''),
    duration: String(input.duration || ''),
    equipment: Array.isArray(input.equipment) ? input.equipment.slice(0, 8).map(String) : [],
    dailyTips: Array.isArray(input.dailyTips) ? input.dailyTips.slice(0, 10).map(String) : [],
    safetyNotes: Array.isArray(input.safetyNotes) ? input.safetyNotes.slice(0, 10).map(String) : [],
    shouldSeekCare: Boolean(input.shouldSeekCare),
    phases
  }
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), { status, headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' } })
}
