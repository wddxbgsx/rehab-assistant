import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/rehab-assistant/',  // GitHub Pages 仓库名
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
