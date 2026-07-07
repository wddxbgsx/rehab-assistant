import { exercises, getExerciseById } from '../data/exercises.js'
import { injuryExerciseMapping } from '../data/injuries.js'

/**
 * 规则引擎：根据用户输入生成训练计划
 */
export function generatePlan(userProfile) {
  const { 
    injuryId, 
    painLevel, 
    duration, 
    diagnosed, 
    habits,
    gender,
    ageGroup 
  } = userProfile

  // 获取该损伤类型的动作映射
  const mapping = injuryExerciseMapping[injuryId]
  if (!mapping) {
    throw new Error(`未找到损伤类型 ${injuryId} 的动作映射`)
  }

  // 根据疼痛程度调整计划
  let plan = adjustByPainLevel(mapping, painLevel)
  
  // 根据持续时长调整
  plan = adjustByDuration(plan, duration)
  
  // 根据年龄调整
  plan = adjustByAge(plan, ageGroup)
  
  // 获取完整的动作信息
  const fullPlan = {
    injuryId,
    painLevel,
    phases: [],
    dailyTips: mapping.dailyTips || [],
    summary: generateSummary(injuryId, painLevel, duration),
    frequency: getFrequency(painLevel, duration),
    duration: estimateDuration(plan),
    equipment: ['瑜伽垫', '泡沫轴', '弹力带（可选）']
  }

  // 热身阶段
  if (plan.warmup.length > 0) {
    fullPlan.phases.push({
      name: '热身',
      icon: '🔥',
      exercises: plan.warmup.map(id => getExerciseById(id)).filter(Boolean)
    })
  }

  // 拉伸阶段
  if (plan.stretch.length > 0) {
    fullPlan.phases.push({
      name: '拉伸',
      icon: '🧘',
      exercises: plan.stretch.map(id => getExerciseById(id)).filter(Boolean)
    })
  }

  // 强化阶段
  if (plan.strength.length > 0) {
    fullPlan.phases.push({
      name: '强化训练',
      icon: '💪',
      exercises: plan.strength.map(id => {
        const ex = getExerciseById(id)
        if (ex && ex.sets) {
          // 根据疼痛程度调整组数
          return {
            ...ex,
            sets: Math.max(ex.sets - (painLevel >= 3 ? 1 : 0), 1)
          }
        }
        return ex
      }).filter(Boolean)
    })
  }

  // 放松阶段
  if (plan.relax.length > 0) {
    fullPlan.phases.push({
      name: '放松',
      icon: '😌',
      exercises: plan.relax.map(id => getExerciseById(id)).filter(Boolean)
    })
  }

  return fullPlan
}

/**
 * 根据疼痛程度调整计划
 */
function adjustByPainLevel(mapping, painLevel) {
  const plan = {
    warmup: [...mapping.warmup],
    stretch: [...mapping.stretch],
    strength: [...mapping.strength],
    relax: [...mapping.relax]
  }

  if (painLevel >= 4) {
    // 高疼痛：只做热身和轻柔拉伸，不做强化
    plan.strength = []
    plan.warmup = plan.warmup.slice(0, 2) // 减少热身
  } else if (painLevel === 3) {
    // 中等疼痛：减少强化动作
    plan.strength = plan.strength.slice(0, Math.min(plan.strength.length, 2))
  }
  // painLevel 1-2: 保持原样

  return plan
}

/**
 * 根据持续时长调整
 */
function adjustByDuration(plan, duration) {
  // 慢性期可以稍微增加强度
  if (duration === '3个月以上') {
    // 慢性期，保持现状或稍微增加
    return plan
  } else if (duration === '1周以内') {
    // 急性期，减少动作
    return {
      ...plan,
      strength: plan.strength.slice(0, Math.min(plan.strength.length, 2))
    }
  }
  return plan
}

/**
 * 根据年龄调整
 */
function adjustByAge(plan, ageGroup) {
  if (ageGroup === '60岁以上') {
    // 老年人：减少动作数量
    return {
      warmup: plan.warmup.slice(0, 2),
      stretch: plan.stretch.slice(0, Math.min(plan.stretch.length, 3)),
      strength: plan.strength.slice(0, Math.min(plan.strength.length, 2)),
      relax: plan.relax.slice(0, 2)
    }
  }
  return plan
}

/**
 * 生成计划概述
 */
function generateSummary(injuryId, painLevel, duration) {
  const injuryNames = {
    shoulder_impingement: '肩峰撞击',
    rotator_cuff: '肩袖损伤',
    frozen_shoulder: '肩周炎',
    lumbar_strain: '腰肌劳损',
    disc_herniation: '腰椎间盘突出',
    chondromalacia: '髌骨软化',
    meniscus: '半月板损伤',
    tendinitis: '腱鞘炎',
    carpal_tunnel: '腕管综合征',
    tennis_elbow: '网球肘',
    plantar_fasciitis: '足底筋膜炎'
  }

  const injuryName = injuryNames[injuryId] || injuryId
  const painDesc = painLevel <= 2 ? '轻微' : painLevel === 3 ? '中等' : '较重'
  const durationDesc = duration === '1周以内' ? '急性期' : 
                       duration === '1-4周' ? '亚急性早期' :
                       duration === '1-3个月' ? '亚急性期' : '慢性期'

  return `针对${injuryName}（${painDesc}疼痛，${durationDesc}），加强相关肌肉力量，改善关节稳定性。`
}

/**
 * 获取训练频率建议
 */
function getFrequency(painLevel, duration) {
  if (painLevel >= 4) {
    return '疼痛缓解后再开始训练，或遵医嘱'
  } else if (painLevel === 3) {
    return '每周2-3次，隔天训练'
  } else if (duration === '1周以内') {
    return '每天1-2次轻柔拉伸，疼痛缓解后开始强化'
  } else {
    return '每周3-4次，隔天训练'
  }
}

/**
 * 估算训练时长
 */
function estimateDuration(plan) {
  let totalMinutes = 0
  
  // 热身：每个动作约1-2分钟
  totalMinutes += plan.warmup.length * 1.5
  
  // 拉伸：每个动作约1分钟
  totalMinutes += plan.stretch.length * 1
  
  // 强化：每个动作约2分钟（含休息）
  totalMinutes += plan.strength.length * 2
  
  // 放松：每个动作约1.5分钟
  totalMinutes += plan.relax.length * 1.5
  
  return `约${Math.round(totalMinutes)}分钟`
}
