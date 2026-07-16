<template>
  <main class="history-page">
    <section class="history-card">
      <div class="heading">
        <div><h1>我的训练计划</h1><p>选择以前生成的计划，无需再次填写评估。</p></div>
        <button @click="$router.push('/assessment')">生成新计划</button>
      </div>
      <div v-if="!authEnabled" class="empty">登录服务尚未配置。</div>
      <div v-else-if="!authState.loaded" class="empty">正在确认登录状态...</div>
      <div v-else-if="!authState.signedIn" class="empty">
        登录后才能查看历史计划。<button @click="$router.push('/account')">去登录</button>
      </div>
      <div v-else-if="loading" class="empty">正在加载历史计划...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="plans.length === 0" class="empty">还没有保存的计划，先完成一次评估吧。</div>
      <div v-else class="plan-list">
        <button v-for="item in plans" :key="item.id" class="plan-item" @click="openPlan(item.id)">
          <span><strong>{{ item.title }}</strong><small>{{ formatDate(item.created_at) }}</small></span>
          <span>查看 →</span>
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { authEnabled, authState } from '../services/auth.js'
import { listPlans } from '../services/api.js'

const router = useRouter()
const plans = ref([])
const loading = ref(false)
const error = ref('')

async function load() {
  if (!authState.signedIn) return
  loading.value = true
  error.value = ''
  try { plans.value = (await listPlans()).plans || [] }
  catch (e) { error.value = e.message }
  finally { loading.value = false }
}

function openPlan(id) { router.push({ path: '/plan', query: { id } }) }
function formatDate(value) { return new Date(value).toLocaleString('zh-CN') }
onMounted(load)
watch(() => authState.signedIn, load)
</script>

<style scoped>
.history-page { min-height: calc(100vh - 58px); background: #f5f7fa; padding: 24px 16px; }
.history-card { max-width: 760px; margin: auto; }
.heading { display: flex; justify-content: space-between; gap: 16px; align-items: center; margin-bottom: 20px; }
.heading p { color: #777; margin-top: 6px; }
.heading button, .empty button { border: 0; background: #667eea; color: white; padding: 11px 16px; border-radius: 22px; cursor: pointer; }
.empty, .error { background: white; padding: 36px 20px; border-radius: 14px; text-align: center; color: #666; }
.error { color: #b42318; }
.plan-list { display: grid; gap: 12px; }
.plan-item { width: 100%; border: 1px solid #e5e5e5; background: white; border-radius: 12px; padding: 18px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; text-align: left; }
.plan-item:hover { border-color: #667eea; transform: translateY(-1px); }
.plan-item small { display: block; color: #888; margin-top: 6px; }
@media (max-width: 520px) { .heading { align-items: flex-start; flex-direction: column; } }
</style>
