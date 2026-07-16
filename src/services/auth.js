import { reactive } from 'vue'

export const authState = reactive({
  loaded: false,
  signedIn: false,
  username: '',
  getToken: null
})

export const authEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)

export function syncAuthState({ loaded, signedIn, username, getToken }) {
  authState.loaded = loaded
  authState.signedIn = signedIn
  authState.username = username || ''
  authState.getToken = getToken || null
}

export async function getAuthToken() {
  if (authEnabled && !authState.loaded) {
    await new Promise(resolve => {
      const started = Date.now()
      const timer = setInterval(() => {
        if (authState.loaded || Date.now() - started > 3000) {
          clearInterval(timer)
          resolve()
        }
      }, 50)
    })
  }
  return authState.signedIn && authState.getToken ? authState.getToken() : null
}
