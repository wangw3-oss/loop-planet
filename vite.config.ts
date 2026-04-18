import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-gesture-files',
      closeBundle() {
        // 确保dist目录存在
        const distDir = resolve(__dirname, 'dist')
        if (!existsSync(distDir)) {
          mkdirSync(distDir, { recursive: true })
        }

        // 确保gesture目录存在
        const gestureDir = resolve(distDir, 'gesture')
        if (!existsSync(gestureDir)) {
          mkdirSync(gestureDir, { recursive: true })
        }

        // 复制gesture/index.html到dist目录
        const srcGestureHtml = resolve(__dirname, 'gesture', 'index.html')
        const destGestureHtml = resolve(gestureDir, 'index.html')
        
        if (existsSync(srcGestureHtml)) {
          copyFileSync(srcGestureHtml, destGestureHtml)
          console.log('Copied gesture/index.html to dist/gesture/index.html')
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})