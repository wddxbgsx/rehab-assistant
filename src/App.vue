<template>
  <div id="app">
    <header v-show="$route.name !== 'Home'" class="app-nav">
      <button class="brand" @click="$router.push('/')">🏥 恢复训练助手</button>
      <AuthStatus v-if="authEnabled" />
      <button v-else class="account-link" @click="$router.push('/account')">登录 / 注册</button>
    </header>
    <router-view />
  </div>
</template>

<script setup>
import AuthStatus from './components/AuthStatus.vue'
import { authEnabled } from './services/auth.js'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f7fa;
}

#app {
  min-height: 100vh;
}

.app-nav { height: 58px; padding: 0 18px; background: white; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 20; }
.brand, .account-link { border: 0; background: transparent; cursor: pointer; color: #4d5fc4; font-weight: 600; }
</style>
