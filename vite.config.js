import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  server: {
    allowedHosts: ["unbraceleted-unruly-lucina.ngrok-free.dev"]
  },

  plugins: [react()],
})