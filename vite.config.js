import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('gsap'))           return 'gsap';
          if (id.includes('framer-motion'))  return 'framer';
          if (id.includes('styled-components')) return 'vendor';
          if (id.includes('node_modules'))   return 'vendor';
        },
      },
    },
    minify: true,
  },
})
