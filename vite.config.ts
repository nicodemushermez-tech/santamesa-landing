import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion': ['motion/react'],
          'elevenlabs': ['@11labs/client'],
          'ui': ['lucide-react', 'sonner', 'react-helmet-async'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
