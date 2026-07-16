<template>
  <div class="assessment">
    <!-- 进度条 -->
    <div class="progress-bar">
      <div class="progress" :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
    </div>
    <div class="step-indicator">步骤 {{ currentStep }} / {{ totalSteps }}</div>

    <!-- 步骤1: 基本信息 -->
    <div v-if="currentStep === 1" class="step">
      <h2>基本信息</h2>
      
      <div class="form-group">
        <label>性别</label>
        <div class="radio-group">
          <label class="radio-label" :class="{ active: form.gender === 'male' }">
            <input type="radio" v-model="form.gender" value="male">
            <span class="radio-icon">👨</span>
            <span>男</span>
          </label>
          <label class="radio-label" :class="{ active: form.gender === 'female' }">
            <input type="radio" v-model="form.gender" value="female">
            <span class="radio-icon">👩</span>
            <span>女</span>
          </label>
        </div>
      </div>

      <div class="form-group">
        <label>年龄段</label>
        <div class="radio-group vertical">
          <label class="radio-label" 
            v-for="age in ageGroups" 
            :key="age.value"
            :class="{ active: form.ageGroup === age.value }">
            <input type="radio" v-model="form.ageGroup" :value="age.value">
            <span>{{ age.label }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- 步骤2: 选择不适类型 -->
    <div v-if="currentStep === 2" class="step">
      <h2>选择不适部位/类型</h2>
      
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchKeyword" 
          placeholder="🔍 搜索不适类型..."
          class="search-input"
        >
      </div>

      <div class="injury-list">
        <div v-for="category in filteredCategories" :key="category.category" class="injury-category">
          <h3>── {{ category.category }} ──</h3>
          <div class="injury-options">
            <label 
              v-for="injury in category.injuries" 
              :key="injury.id"
              class="injury-label"
              :class="{ active: form.injuryId === injury.id }">
              <input type="radio" v-model="form.injuryId" :value="injury.id">
              <div class="injury-info">
                <span class="injury-name">{{ injury.name }}</span>
                <span class="injury-desc">{{ injury.description }}</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div v-if="form.injuryId" class="selected-injury">
        已选择：{{ getSelectedInjuryName() }}
      </div>
    </div>

    <!-- 步骤3: 疼痛程度 -->
    <div v-if="currentStep === 3" class="step">
      <h2>当前疼痛程度</h2>
      
      <div class="pain-levels">
        <label 
          v-for="level in painLevels" 
          :key="level.value"
          class="pain-label"
          :class="{ 
            active: form.painLevel === level.value,
            warning: level.value >= 4 
          }">
          <input type="radio" v-model="form.painLevel" :value="level.value">
          <div class="pain-content">
            <span class="pain-number">{{ level.value }}级</span>
            <span class="pain-desc">{{ level.description }}</span>
          </div>
        </label>
      </div>

      <div v-if="form.painLevel >= 4" class="pain-warning">
        <span>⚠️</span>
        <p>疼痛程度较高，建议先就医检查，暂不进行康复训练。</p>
      </div>
    </div>

    <!-- 步骤4: 补充信息 -->
    <div v-if="currentStep === 4" class="step">
      <h2>补充信息</h2>
      
      <div class="form-group">
        <label>持续时长</label>
        <div class="radio-group vertical">
          <label 
            v-for="d in durationOptions" 
            :key="d.value"
            class="radio-label"
            :class="{ active: form.duration === d.value }">
            <input type="radio" v-model="form.duration" :value="d.value">
            <span>{{ d.label }}</span>
          </label>
        </div>
      </div>

      <div class="form-group">
        <label>是否就医确诊</label>
        <div class="radio-group">
          <label class="radio-label" :class="{ active: form.diagnosed === true }">
            <input type="radio" v-model="form.diagnosed" :value="true">
            <span>已确诊</span>
          </label>
          <label class="radio-label" :class="{ active: form.diagnosed === false }">
            <input type="radio" v-model="form.diagnosed" :value="false">
            <span>未确诊（自我判断）</span>
          </label>
        </div>
      </div>

      <div class="form-group">
        <label>日常习惯（可多选）</label>
        <div class="checkbox-group">
          <label 
            v-for="habit in habitOptions" 
            :key="habit.value"
            class="checkbox-label"
            :class="{ active: form.habits.includes(habit.value) }">
            <input type="checkbox" v-model="form.habits" :value="habit.value">
            <span>{{ habit.label }}</span>
          </label>
        </div>
      </div>

      <div class="form-group">
        <label for="additionalInfo">其他情况 <span class="optional">（可选）</span></label>
        <textarea
          id="additionalInfo"
          v-model.trim="form.additionalInfo"
          maxlength="800"
          rows="5"
          class="additional-input"
          placeholder="例如：哪些动作会加重疼痛、活动受限情况、既往病史、可用器材、每天可训练时间等"
        ></textarea>
        <div class="input-help">这些信息将帮助 AI 从动作库中更准确地选择动作。请勿填写姓名、电话等隐私信息。{{ form.additionalInfo.length }}/800</div>
      </div>

      <div class="save-notice">
        <strong>计划保存说明</strong>
        <p>登录用户的计划会保存到“我的计划”；游客可以正常生成，但本次计划不会存入云端，下次需重新评估。</p>
      </div>
    </div>

    <!-- 导航按钮 -->
    <div class="navigation">
      <button v-if="currentStep > 1" class="btn btn-secondary" @click="prevStep">
        上一步
      </button>
      <button 
        v-if="currentStep < totalSteps" 
        class="btn btn-primary" 
        @click="nextStep"
        :disabled="!canProceed">
        下一步
      </button>
      <button 
        v-if="currentStep === totalSteps" 
        class="btn btn-primary" 
        @click="generatePlan"
        :disabled="!canProceed">
        生成训练计划
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { injuryCategories, searchInjuries } from '../data/injuries.js'

const router = useRouter()
const currentStep = ref(1)
const totalSteps = 4
const searchKeyword = ref('')

const form = ref({
  gender: '',
  ageGroup: '',
  injuryId: '',
  painLevel: null,
  duration: '',
  diagnosed: null,
  habits: [],
  additionalInfo: ''
})

const ageGroups = [
  { value: '18-30', label: '18-30岁' },
  { value: '31-45', label: '31-45岁' },
  { value: '46-60', label: '46-60岁' },
  { value: '60+', label: '60岁以上' }
]

const painLevels = [
  { value: 1, description: '轻微不适，不影响日常活动' },
  { value: 2, description: '明显疼痛，但可以忍受' },
  { value: 3, description: '较痛，部分动作受限' },
  { value: 4, description: '很痛，严重影响活动' },
  { value: 5, description: '剧痛，无法正常活动' }
]

const durationOptions = [
  { value: '1周以内', label: '1周以内' },
  { value: '1-4周', label: '1-4周' },
  { value: '1-3个月', label: '1-3个月' },
  { value: '3个月以上', label: '3个月以上' }
]

const habitOptions = [
  { value: 'sedentary', label: '久坐办公' },
  { value: 'standing', label: '经常站立' },
  { value: 'bending', label: '经常弯腰/搬重物' },
  { value: 'active', label: '运动爱好者' },
  { value: 'inactive', label: '很少运动' }
]

const filteredCategories = computed(() => {
  if (!searchKeyword.value) return injuryCategories
  
  const keyword = searchKeyword.value.toLowerCase()
  return injuryCategories.map(cat => ({
    ...cat,
    injuries: cat.injuries.filter(i => 
      i.name.includes(keyword) || 
      i.description.includes(keyword)
    )
  })).filter(cat => cat.injuries.length > 0)
})

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1: return form.value.gender && form.value.ageGroup
    case 2: return form.value.injuryId
    case 3: return form.value.painLevel !== null
    case 4: return form.value.duration && form.value.diagnosed !== null
    default: return false
  }
})

const getSelectedInjuryName = () => {
  const all = searchInjuries('')
  const found = all.find(i => i.id === form.value.injuryId)
  return found ? found.name : ''
}

const nextStep = () => {
  if (canProceed.value && currentStep.value < totalSteps) {
    currentStep.value++
    window.scrollTo(0, 0)
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo(0, 0)
  }
}

const generatePlan = () => {
  if (canProceed.value) {
    // 保存表单数据到 localStorage
    sessionStorage.removeItem('guestPlan')
    localStorage.setItem('userProfile', JSON.stringify(form.value))
    router.push('/plan')
  }
}
</script>

<style scoped>
.assessment {
  min-height: 100vh;
  padding: 20px;
  background: #f5f7fa;
}

.optional { color: #888; font-weight: 400; }
.additional-input { width: 100%; padding: 14px; border: 2px solid #e0e0e0; border-radius: 10px; font: inherit; resize: vertical; }
.additional-input:focus { outline: none; border-color: #667eea; }
.input-help { color: #888; font-size: 12px; line-height: 1.5; margin-top: 7px; }
.save-notice { max-width: 500px; margin: 8px auto 22px; padding: 14px; border-radius: 10px; background: #eef8ff; color: #35536b; }
.save-notice p { margin: 5px 0 0; font-size: 13px; line-height: 1.6; }

.progress-bar {
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  margin-bottom: 8px;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.step-indicator {
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-bottom: 24px;
}

.step {
  max-width: 500px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 24px;
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

.radio-group {
  display: flex;
  gap: 12px;
}

.radio-group.vertical {
  flex-direction: column;
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

.radio-icon {
  font-size: 24px;
}

.search-box {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #667eea;
}

.injury-category {
  margin-bottom: 20px;
}

.injury-category h3 {
  text-align: center;
  color: #999;
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 12px;
}

.injury-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.injury-label {
  display: flex;
  align-items: center;
  padding: 16px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.injury-label:hover {
  border-color: #667eea;
}

.injury-label.active {
  border-color: #667eea;
  background: #f0f3ff;
}

.injury-label input[type="radio"] {
  display: none;
}

.injury-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.injury-name {
  font-weight: 500;
  color: #333;
}

.injury-desc {
  font-size: 14px;
  color: #999;
}

.selected-injury {
  text-align: center;
  padding: 12px;
  background: #e8f5e9;
  border-radius: 8px;
  color: #2e7d32;
  margin-top: 16px;
}

.pain-levels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pain-label {
  display: flex;
  padding: 16px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.pain-label:hover {
  border-color: #667eea;
}

.pain-label.active {
  border-color: #667eea;
  background: #f0f3ff;
}

.pain-label.warning.active {
  border-color: #e74c3c;
  background: #ffeaea;
}

.pain-label input[type="radio"] {
  display: none;
}

.pain-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pain-number {
  font-weight: 600;
  font-size: 18px;
  color: #667eea;
  min-width: 40px;
}

.warning .pain-number {
  color: #e74c3c;
}

.pain-desc {
  color: #666;
}

.pain-warning {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  background: #ffeaea;
  border: 1px solid #e74c3c;
  border-radius: 10px;
  margin-top: 16px;
}

.pain-warning span {
  font-size: 20px;
}

.pain-warning p {
  margin: 0;
  color: #c62828;
  font-size: 14px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.checkbox-label:hover {
  border-color: #667eea;
}

.checkbox-label.active {
  border-color: #667eea;
  background: #f0f3ff;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
  padding-bottom: 40px;
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

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-primary:hover:not(:disabled) {
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
</style>
