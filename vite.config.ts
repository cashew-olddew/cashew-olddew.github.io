import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import remarkGfm from 'remark-gfm'
import mdx from '@mdx-js/rollup'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm]}) }
  ],
})
