import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png:  { quality: 80 },
      jpeg: { quality: 80 },
      jpg:  { quality: 80 },
      webp: { lossless: false, quality: 80 },
    }),
  ],
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
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
  },
})
