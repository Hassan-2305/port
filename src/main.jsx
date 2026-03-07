import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'

// Disable browser zoom on desktop (prevents 3D scene crash from resolution scaling)
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
    e.preventDefault();
  }
});
document.addEventListener('wheel', (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
  }
}, { passive: false });

const rootEl = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
);

// If pre-rendered HTML exists (production SSG), hydrate it.
// Otherwise (dev), do a normal createRoot render.
if (rootEl.innerHTML.trim()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
