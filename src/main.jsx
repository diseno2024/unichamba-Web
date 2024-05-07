import React from 'react'
import ReactDOM from 'react-dom/client'
import UnichambaWebApp from './UnichambaWebApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./css/index.css"
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>

      <BrowserRouter>
        <UnichambaWebApp />
      </BrowserRouter>

    </AuthContextProvider>
  </React.StrictMode>,
)
