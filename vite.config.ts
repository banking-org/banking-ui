import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import generouted from '@generouted/react-router/plugin'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), generouted()],
  resolve: { alias: { '@': '/src' } },
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: 'http://192.168.0.96:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
})
