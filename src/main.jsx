import React from 'react'
import ReactDOM from 'react-dom/client'
import UnichambaWebApp from './UnichambaWebApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./css/index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UnichambaWebApp />
    </BrowserRouter>
  </React.StrictMode>,
)
