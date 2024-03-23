import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import generouted from '@generouted/react-router/plugin'
import {config} from "dotenv"

config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), generouted()],
  resolve: { alias: { '@': '/src' } },
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
})
