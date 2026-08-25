import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/metrics': 'https://dj7q35sqbbywm.cloudfront.net',
      '/progress': 'https://dj7q35sqbbywm.cloudfront.net',
      '/demo': 'https://dj7q35sqbbywm.cloudfront.net',
    },
  },
})
