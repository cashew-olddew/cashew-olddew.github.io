import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import mdx from '@mdx-js/rollup'
import svgr from "vite-plugin-svgr"
import { writeFileSync } from 'fs'
import { postsMeta, SITE_URL } from './src/posts/posts-meta'

function generateRss(): string {
  const sorted = [...postsMeta].sort((a, b) => b.date.localeCompare(a.date))
  const items = sorted.map(p => {
    const url = `${SITE_URL}/?view=web&amp;open=${p.id}`
    const pubDate = new Date(p.date).toUTCString()
    return `    <item>
      <title><![CDATA[${p.emoji} ${p.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${p.description}]]></description>
    </item>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>cashew-olddew</title>
    <link>${SITE_URL}</link>
    <description>Godot game dev, shaders, and random thoughts from Cashew OldDew</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
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
    svgr(),
    {
      name: 'rss',
      buildStart() {
        writeFileSync('public/rss.xml', generateRss())
      },
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/rss.xml') {
            res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
            res.end(generateRss())
          } else {
            next()
          }
        })
      },
    },
  ],
})
