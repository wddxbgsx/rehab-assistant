<template>
  <div class="auth-status">
    <template v-if="isSignedIn">
      <button class="nav-link" @click="$router.push('/plans')">我的计划</button>
      <span class="username">{{ user?.username }}</span>
      <button class="nav-link" @click="signOut">退出</button>
    </template>
    <button v-else class="nav-link primary" @click="$router.push('/account')">登录 / 注册</button>
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'
import { useAuth, useUser } from '@clerk/vue'
import { syncAuthState } from '../services/auth.js'

const { isLoaded, isSignedIn, getToken, signOut } = useAuth()
const { user } = useUser()

watchEffect(() => syncAuthState({
  loaded: Boolean(isLoaded.value),
  signedIn: Boolean(isSignedIn.value),
  username: user.value?.username,
  getToken
}))
</script>

<style scoped>
.auth-status { display: flex; align-items: center; gap: 10px; }
.username { color: #555; font-size: 14px; }
.nav-link { border: 0; background: transparent; color: #667eea; cursor: pointer; padding: 8px 10px; border-radius: 8px; }
.nav-link:hover { background: #f0f3ff; }
.primary { background: #667eea; color: white; }
</style>
