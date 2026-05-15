import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyleSheetManager } from 'styled-components'
import './index.css'
import App from './App.jsx'
import { getNonce } from './utils/nonce.js'

const nonce = getNonce();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyleSheetManager nonce={nonce}>
      <App />
    </StyleSheetManager>
  </StrictMode>,
)
