import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    allowedHosts: ["unbraceleted-unruly-lucina.ngrok-free.dev"]
  },

  plugins: [react()],

  ssr: {
    // Prevent these browser-only packages from being bundled during SSR build
    external: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/postprocessing',
      'postprocessing',
    ],
    noExternal: [],
  },
})