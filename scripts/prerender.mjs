/**
 * prerender.mjs
 * Runs after `vite build` to inject SSR-rendered HTML into dist/index.html.
 * Turns the CSR shell into a pre-rendered static file for crawlers / SEO.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

// 1. Read the built index.html template
const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8');

// 2. Import the server bundle and render
const serverEntry = path.resolve(distDir, 'server/entry-server.js');
const { render } = await import(pathToFileURL(serverEntry).href);

const appHtml = render();

// 3. Inject rendered HTML into the SSR outlet placeholder
const html = template.replace('<!--ssr-outlet-->', appHtml);

// 4. Write back to dist/index.html
fs.writeFileSync(path.resolve(distDir, 'index.html'), html, 'utf-8');

console.log('✅ Pre-render complete — dist/index.html now contains static HTML');
