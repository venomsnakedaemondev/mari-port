import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve : {
    alias : {
      "@":path.resolve(__dirname, "./src"),
    }
  },
  server: {
    allowedHosts: [
      'localhost',
      '07e9-186-172-205-147.ngrok-free.app' // Allowed host for development purposes
    ],
  },
})