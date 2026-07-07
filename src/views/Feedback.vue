<template>
  <div class="feedback-page">
    <div class="feedback-header">
      <button class="back-btn" @click="goBack">← 返回</button>
      <h1>💬 意见反馈</h1>
    </div>

    <div class="feedback-form">
      <div class="form-group">
        <label>反馈类型</label>
        <div class="radio-group vertical">
          <label 
            v-for="type in feedbackTypes" 
            :key="type.value"
            class="radio-label"
            :class="{ active: form.type === type.value }">
            <input type="radio" v-model="form.type" :value="type.value">
            <span>{{ type.label }}</span>
          </label>
        </div>
      </div>

      <div class="form-group">
        <label>详细描述</label>
        <textarea 
          v-model="form.content" 
          placeholder="请详细描述你的反馈或建议..."
          rows="6"
          class="textarea"
        ></textarea>
      </div>

      <div class="form-group">
        <label>联系方式（可选）</label>
        <input 
          type="text" 
          v-model="form.contact" 
          placeholder="如需回复，可留下联系方式"
          class="input"
        >
      </div>

      <button 
        class="submit-btn" 
        @click="submitFeedback"
        :disabled="!canSubmit">
        提交反馈
      </button>
    </div>

    <!-- 提交成功提示 -->
    <div v-if="submitted" class="success-modal">
      <div class="success-content">
        <span class="success-icon">✅</span>
        <h2>感谢你的反馈！</h2>
        <p>我们会认真对待每一条反馈，不断改进产品。</p>
        <button class="btn" @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const submitted = ref(false)

const form = ref({
  type: '',
  content: '',
  contact: ''
})

const feedbackTypes = [
  { value: 'missing_injury', label: '找不到我的不适类型（希望新增）' },
  { value: 'plan_issue', label: '训练计划不合适' },
  { value: 'ui_issue', label: '界面/体验问题' },
  { value: 'suggestion', label: '其他建议' }
]

const canSubmit = computed(() => {
  return form.value.type && form.value.content.trim()
})

const submitFeedback = () => {
  if (!canSubmit.value) return

  // 保存反馈到 localStorage（实际项目中应该发送到服务器）
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]')
  feedbacks.push({
    ...form.value,
    timestamp: new Date().toISOString(),
    userProfile: JSON.parse(localStorage.getItem('userProfile') || '{}')
  })
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks))

  submitted.value = true
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.feedback-page {
  min-height: 100vh;
  background: #f5f7fa;
}

.feedback-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.feedback-header h1 {
  margin: 0;
  color: white;
  font-size: 20px;
}

.feedback-form {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #555;
  margin-bottom: 12px;
}

.radio-group.vertical {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.radio-label:hover {
  border-color: #667eea;
}

.radio-label.active {
  border-color: #667eea;
  background: #f0f3ff;
}

.radio-label input[type="radio"] {
  display: none;
}

.textarea {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;
}

.textarea:focus {
  border-color: #667eea;
}

.input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.input:focus {
  border-color: #667eea;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.success-content {
  background: white;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  max-width: 300px;
}

.success-icon {
  font-size: 48px;
}

.success-content h2 {
  margin: 16px 0 8px;
  color: #333;
}

.success-content p {
  margin: 0 0 24px;
  color: #666;
  font-size: 14px;
}

.btn {
  padding: 12px 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}
</style>
