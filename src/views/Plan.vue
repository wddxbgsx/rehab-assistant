<template>
  <div class="plan-page">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p class="loading-title">{{ loadingText }}</p>
      <div class="loading-tips">
        <p>💡 {{ currentTip }}</p>
      </div>
    </div>

    <!-- 计划内容 -->
    <div v-else-if="plan" class="plan-content">
      <!-- 头部 -->
      <div class="plan-header">
        <h1>🎯 你的居家训练计划</h1>
      </div>

      <!-- 计划概述 -->
      <div class="plan-summary">
        <div class="summary-item">
          <span class="label">针对</span>
          <span class="value">{{ injuryName }}</span>
        </div>
        <div class="summary-item">
          <span class="label">疼痛程度</span>
          <span class="value">{{ plan.painLevel }}级</span>
        </div>
        <div class="summary-item">
          <span class="label">建议频率</span>
          <span class="value">{{ plan.frequency }}</span>
        </div>
        <div class="summary-item">
          <span class="label">预计时长</span>
          <span class="value">{{ plan.duration }}</span>
        </div>
      </div>

      <!-- 计划描述 -->
      <div class="plan-desc">
        <p>{{ plan.summary }}</p>
      </div>

      <!-- 所需物品 -->
      <div class="equipment">
        <h3>所需物品</h3>
        <div class="equipment-list">
          <span v-for="item in plan.equipment" :key="item" class="equipment-tag">
            {{ item }}
          </span>
        </div>
      </div>

      <!-- 训练阶段 -->
      <div v-for="(phase, index) in plan.phases" :key="index" class="phase">
        <h2 class="phase-title">
          <span class="phase-icon">{{ phase.icon }}</span>
          {{ phase.name }}
        </h2>
        
        <div class="exercises">
          <div v-for="exercise in phase.exercises" :key="exercise.id" class="exercise-card">
            <div class="exercise-image">
              <img 
                :src="exercise.image" 
                :alt="exercise.name"
                :class="{ loaded: imageLoaded[exercise.id] }"
                @load="onImageLoad(exercise.id)"
                @error="handleImageError"
              >
              <div v-if="!imageLoaded[exercise.id]" class="image-placeholder">
                <span class="placeholder-icon">🏃</span>
                <span class="placeholder-text">正在加载动作图示...</span>
              </div>
            </div>
            <div class="exercise-info">
              <h3>{{ exercise.name }}</h3>
              <p class="exercise-desc">{{ exercise.description }}</p>
              <div class="exercise-params">
                <span v-if="exercise.sets">{{ exercise.sets }}组</span>
                <span v-if="exercise.reps">× {{ exercise.reps }}</span>
                <span v-if="exercise.duration">{{ exercise.duration }}</span>
                <span v-if="exercise.rest" class="rest">休息{{ exercise.rest }}</span>
              </div>
              <div class="exercise-tips">
                <h4>动作要点：</h4>
                <ul>
                  <li v-for="(tip, i) in exercise.tips" :key="i">{{ tip }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 日常注意事项 -->
      <div class="daily-tips">
        <h2>📅 日常注意事项</h2>
        <ul>
          <li v-for="(tip, index) in plan.dailyTips" :key="index">{{ tip }}</li>
        </ul>
      </div>

      <!-- 免责声明 -->
      <div class="disclaimer">
        <p><strong>⚠️ 免责声明</strong></p>
        <p>本计划仅供参考，不构成医疗建议。如有严重不适，请及时就医。</p>
      </div>

      <!-- 操作按钮 -->
      <div class="actions">
        <button class="btn btn-secondary" @click="regenerate">
          重新评估
        </button>
        <button class="btn btn-primary" @click="goToFeedback">
          意见反馈
        </button>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else class="error">
      <p>无法生成训练计划，请重新评估。</p>
      <button class="btn btn-primary" @click="goHome">返回首页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { generatePlan } from '../utils/planGenerator.js'
import { getInjuryById } from '../data/injuries.js'

const router = useRouter()
const loading = ref(true)
const loadingText = ref('正在分析你的身体状况...')
const currentTip = ref('')
const plan = ref(null)
const injuryName = ref('')
const imageLoaded = reactive({})

// 健康小贴士
const tips = [
  '坚持训练，效果会逐渐显现',
  '训练前适当热身可以减少受伤风险',
  '保持良好的作息习惯有助于恢复',
  '训练后适当拉伸可以缓解肌肉酸痛',
  '循序渐进，不要急于求成',
  '保持积极的心态对恢复很重要',
  '充足的睡眠是恢复的关键',
  '多喝水，保持身体水分充足'
]

onMounted(async () => {
  const profileStr = localStorage.getItem('userProfile')
  if (!profileStr) {
    loading.value = false
    return
  }

  const profile = JSON.parse(profileStr)
  
  // 获取损伤名称
  const injury = getInjuryById(profile.injuryId)
  injuryName.value = injury ? injury.name : profile.injuryId

  // 生成计划
  try {
    plan.value = generatePlan(profile)
  } catch (error) {
    console.error('生成计划失败:', error)
    loading.value = false
    return
  }

  // 初始化图片加载状态
  if (plan.value && plan.value.phases) {
    plan.value.phases.forEach(phase => {
      phase.exercises.forEach(exercise => {
        imageLoaded[exercise.id] = false
      })
    })
  }

  // 预加载首屏图片（第一个阶段的前2张）
  const firstPhase = plan.value.phases[0]
  if (firstPhase && firstPhase.exercises.length > 0) {
    const preloadPromises = firstPhase.exercises.slice(0, 2).map(exercise => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          imageLoaded[exercise.id] = true
          resolve()
        }
        img.onerror = resolve
        img.src = exercise.image
      })
    })
    await Promise.all(preloadPromises)
  }

  // 显示加载步骤动画
  const steps = [
    { text: '正在分析你的身体状况...', duration: 1200 },
    { text: '正在匹配适合的训练动作...', duration: 1000 },
    { text: '正在生成个性化训练计划...', duration: 1200 },
    { text: '正在准备训练动作图片...', duration: 800 }
  ]

  for (let i = 0; i < steps.length; i++) {
    loadingText.value = steps[i].text
    currentTip.value = tips[Math.floor(Math.random() * tips.length)]
    await new Promise(resolve => setTimeout(resolve, steps[i].duration))
  }

  loading.value = false
})

const onImageLoad = (id) => {
  imageLoaded[id] = true
}

const handleImageError = (e) => {
  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5Zu+54mHPC90ZXh0Pjwvc3ZnPg=='
}

const regenerate = () => {
  localStorage.removeItem('userProfile')
  router.push('/assessment')
}

const goToFeedback = () => {
  router.push('/feedback')
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.plan-page {
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 40px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e0e0e0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-title {
  margin-top: 20px;
  color: #333;
  font-size: 18px;
  font-weight: 500;
}

.loading-tips {
  margin-top: 30px;
  padding: 16px 24px;
  background: #f0f3ff;
  border-radius: 12px;
  max-width: 300px;
}

.loading-tips p {
  margin: 0;
  color: #667eea;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
}

.plan-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 20px;
  text-align: center;
}

.plan-header h1 {
  color: white;
  margin: 0;
  font-size: 24px;
}

.plan-summary {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 20px;
  margin: -20px 20px 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.summary-item .label {
  font-size: 12px;
  color: #999;
}

.summary-item .value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.plan-desc {
  padding: 20px;
  text-align: center;
  color: #666;
}

.plan-desc p {
  margin: 0;
  line-height: 1.6;
}

.equipment {
  padding: 0 20px 20px;
}

.equipment h3 {
  font-size: 14px;
  color: #999;
  margin: 0 0 10px;
}

.equipment-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.equipment-tag {
  padding: 8px 16px;
  background: white;
  border-radius: 20px;
  font-size: 14px;
  color: #667eea;
  border: 1px solid #667eea;
}

.phase {
  padding: 0 20px;
  margin-bottom: 30px;
}

.phase-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 16px;
  font-size: 20px;
  color: #333;
}

.phase-icon {
  font-size: 24px;
}

.exercises {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.exercise-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.exercise-image {
  width: 100%;
  height: 200px;
  background: #f0f3ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.exercise-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.exercise-image img.loaded {
  opacity: 1;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f3ff 0%, #e8ecff 100%);
}

.placeholder-icon {
  font-size: 48px;
  animation: pulse 1.5s ease-in-out infinite;
}

.placeholder-text {
  font-size: 14px;
  color: #667eea;
  margin-top: 8px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

.exercise-info {
  padding: 16px;
}

.exercise-info h3 {
  margin: 0 0 8px;
  font-size: 18px;
  color: #333;
}

.exercise-desc {
  margin: 0 0 12px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.exercise-params {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.exercise-params span {
  padding: 4px 12px;
  background: #f0f3ff;
  border-radius: 4px;
  font-size: 14px;
  color: #667eea;
}

.exercise-params .rest {
  background: #fff3e0;
  color: #e65100;
}

.exercise-tips {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 12px;
}

.exercise-tips h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #666;
}

.exercise-tips ul {
  margin: 0;
  padding-left: 20px;
}

.exercise-tips li {
  font-size: 13px;
  color: #666;
  line-height: 1.8;
}

.daily-tips {
  margin: 0 20px 20px;
  padding: 20px;
  background: #fff3e0;
  border-radius: 12px;
}

.daily-tips h2 {
  margin: 0 0 16px;
  font-size: 20px;
  color: #333;
}

.daily-tips ul {
  margin: 0;
  padding-left: 20px;
}

.daily-tips li {
  font-size: 14px;
  color: #666;
  line-height: 2;
}

.disclaimer {
  margin: 0 20px 20px;
  padding: 16px;
  background: #ffeaea;
  border: 1px solid #e74c3c;
  border-radius: 12px;
}

.disclaimer p {
  margin: 0;
  font-size: 14px;
  color: #c62828;
  line-height: 1.6;
}

.disclaimer p:first-child {
  margin-bottom: 8px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 0 20px 40px;
}

.btn {
  padding: 14px 32px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #f0f3ff;
}

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 20px;
}

.error p {
  color: #666;
}
</style>
