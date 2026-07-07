<template>
  <div class="home">
    <div class="hero">
      <div class="logo">🏥</div>
      <h1>居家恢复训练助手</h1>
      <p class="subtitle">根据你的身体状况，生成个性化的居家训练计划</p>
    </div>

    <div class="disclaimer">
      <div class="disclaimer-icon">⚠️</div>
      <div class="disclaimer-content">
        <strong>免责声明</strong>
        <p>本工具提供的训练建议仅供参考，不构成医疗建议。如有严重不适，请及时就医。</p>
      </div>
    </div>

    <button class="start-btn" @click="startAssessment">
      开始评估
    </button>

    <div class="features">
      <div class="feature">
        <span class="feature-icon">🎯</span>
        <span>个性化方案</span>
      </div>
      <div class="feature">
        <span class="feature-icon">🏠</span>
        <span>居家可做</span>
      </div>
      <div class="feature">
        <span class="feature-icon">💪</span>
        <span>徒手为主</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startAssessment = () => {
  router.push('/assessment')
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero {
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

.logo {
  font-size: 64px;
  margin-bottom: 16px;
}

h1 {
  font-size: 28px;
  margin: 0 0 12px;
  font-weight: 600;
}

.subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.disclaimer {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.disclaimer-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.disclaimer-content {
  flex: 1;
}

.disclaimer-content strong {
  display: block;
  margin-bottom: 4px;
  color: #e67e22;
}

.disclaimer-content p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.start-btn {
  background: white;
  color: #667eea;
  border: none;
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 40px;
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
}

.start-btn:active {
  transform: translateY(0);
}

.features {
  display: flex;
  gap: 30px;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 14px;
}

.feature-icon {
  font-size: 32px;
}
</style>
