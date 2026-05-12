import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import mdx from '@mdx-js/rollup'
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    { 
      enforce: 'pre', 
      ...mdx({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: 'everforest-light',
            }
          ]
        ]
      }) },
    svgr()
  ],
})
