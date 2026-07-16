import { createApp } from 'vue'
import { clerkPlugin } from '@clerk/vue'
import { zhCN } from '@clerk/localizations'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (clerkKey) {
  app.use(clerkPlugin, {
    publishableKey: clerkKey,
    localization: zhCN,
    signInFallbackRedirectUrl: '/rehab-assistant/#/',
    signUpFallbackRedirectUrl: '/rehab-assistant/#/'
  })
}
app.use(router)
app.mount('#app')

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register('/rehab-assistant/sw.js').catch(console.warn)
}
