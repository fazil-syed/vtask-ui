import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve("./src") }],
  },
  server: {
    proxy: {
      "/api": {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
