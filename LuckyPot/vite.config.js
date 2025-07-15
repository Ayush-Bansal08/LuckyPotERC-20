import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'




export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    global: 'window', // helps simulate global for buffer and other node modules
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
});
