import { getAuthToken } from './auth.js'

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

async function request(path, options = {}) {
  if (!API_URL) throw new Error('尚未配置后端服务地址')

  const token = await getAuthToken()
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.error || '请求失败，请稍后重试')
  return body
}

export const generateAiPlan = profile => request('/plans/generate', {
  method: 'POST',
  body: JSON.stringify({ profile })
})

export const listPlans = () => request('/plans')
export const getSavedPlan = id => request(`/plans/${encodeURIComponent(id)}`)
