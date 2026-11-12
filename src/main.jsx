import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Respect the OS "reduce motion" setting for all framer-motion animations */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
    <Analytics />
  </StrictMode>,
)
