import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use '/' for Vercel, '/Marketing-Factories/' for GitHub Pages
  // Set VITE_BASE_PATH environment variable in your deployment settings if needed
  base: process.env.GITHUB_PAGES === 'true' ? '/Marketing-Factories/' : '/',
})
