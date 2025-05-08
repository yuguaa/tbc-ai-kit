import { defineConfig } from 'vite'
export default defineConfig({
  root: '.',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://test.21tb.com/',
        changeOrigin: true
      }
    }
  }
})
