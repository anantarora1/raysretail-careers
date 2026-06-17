import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://<user>.github.io/raysretail-careers/ on GitHub Pages.
// Override with BASE_PATH=/ when deploying to a root domain (Netlify/Vercel/custom).
export default defineConfig({
  base: process.env.BASE_PATH ?? '/raysretail-careers/',
  plugins: [react()],
})
