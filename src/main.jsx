import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client"
import "./index.css"
import Just from './components/Just'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Just/>
  </StrictMode>,
)
