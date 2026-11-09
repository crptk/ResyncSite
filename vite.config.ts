import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/metrics': 'https://178-105-35-252.sslip.io',
      '/progress': 'https://178-105-35-252.sslip.io',
      '/demo': 'https://178-105-35-252.sslip.io',
    },
  },
})
