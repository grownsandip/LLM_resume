import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client"
import "./index.css"
import Just from './components/Just'
import { Toaster } from 'react-hot-toast'
import Connection_status from './components/Connection_status'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position='top-right'/>
    <Connection_status/>
    <Just/>
  </StrictMode>,
)
