import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use /tiderock-unified/ when building for GitHub Pages (set via env var),
// otherwise default to / for Vercel and local dev.
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  plugins: [react()],
  base,
})
