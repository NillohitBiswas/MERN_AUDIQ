import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Enables sourcemap generation
  },
  server:{
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        server: false,
      }
    }
  }
  
})
