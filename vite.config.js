import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { renderStaticHtml, renderJsonLd, renderLlmsTxt } from './seo/staticContent.js'

// Puts the portfolio's text into the HTML itself, so tools that don't run
// JavaScript (ChatGPT and other AI assistants, crawlers, link previews) can
// read it. Browsers hide it with one line of script, and React replaces it.
const staticContent = () => ({
  name: 'static-content',
  transformIndexHtml(html) {
    const hideForJsBrowsers =
      `<script>document.documentElement.classList.add('js')</script>` +
      `<style>.js #static-content{display:none}</style>`
    return html
      .replace('</head>', `  ${renderJsonLd()}\n  ${hideForJsBrowsers}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${renderStaticHtml()}\n  </div>`)
  },
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'llms.txt', source: renderLlmsTxt() })
  },
})

export default defineConfig({
  server: {
    allowedHosts: ["unbraceleted-unruly-lucina.ngrok-free.dev"]
  },

  plugins: [react(), staticContent()],
})
