<template>
  <main class="account-page">
    <section class="account-card">
      <h1>登录或注册</h1>
      <div class="username-notice">
        <strong>用户名格式说明</strong>
        <p>仅支持英文字母、数字、下划线（_）和短横线（-），不支持中文。长度为 4–64 个字符。</p>
      </div>
      <div v-if="!authEnabled" class="setup-warning">
        登录服务尚未配置。你仍可以游客身份使用评估和生成计划。
      </div>
      <template v-else>
        <div class="auth-actions">
          <SignInButton mode="modal">
            <button>登录</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button>注册新账号</button>
          </SignUpButton>
        </div>
        <p class="validation-note">如果用户名包含中文或其他不支持的字符，注册窗口会显示错误提示并阻止提交。</p>
      </template>
      <p class="guest-note">注册不是必须的。游客也可以生成计划，但计划不会保存，下次需要重新完成评估。</p>
      <button class="guest-button" @click="$router.push('/assessment')">暂不注册，以游客身份使用</button>
    </section>
  </main>
</template>

<script setup>
import { SignInButton, SignUpButton } from '@clerk/vue'
import { authEnabled } from '../services/auth.js'
</script>

<style scoped>
.account-page { min-height: calc(100vh - 58px); background: #f5f7fa; padding: 28px 16px; }
.account-card { max-width: 470px; margin: auto; background: white; border-radius: 16px; padding: 24px; box-shadow: 0 8px 30px rgba(0,0,0,.08); }
h1 { text-align: center; margin-bottom: 18px; }
.username-notice { border: 2px solid #667eea; background: #f0f3ff; border-radius: 12px; padding: 14px; margin-bottom: 18px; color: #39458a; }
.username-notice p, .guest-note { margin: 6px 0 0; line-height: 1.6; font-size: 14px; }
.setup-warning { background: #fff3cd; color: #7a5b00; padding: 14px; border-radius: 10px; }
.guest-note { color: #666; text-align: center; margin-top: 18px; }
.guest-button { width: 100%; margin-top: 12px; padding: 13px; border: 1px solid #667eea; background: white; color: #667eea; border-radius: 24px; cursor: pointer; }
.auth-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.auth-actions button { width: 100%; padding: 12px; border: 0; border-radius: 9px; cursor: pointer; background: #667eea; color: white; }
.validation-note { color: #777; font-size: 13px; line-height: 1.6; text-align: center; margin: 10px 0 0; }
</style>
