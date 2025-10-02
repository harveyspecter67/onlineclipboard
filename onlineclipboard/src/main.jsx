import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'; // Import axios
import { UserContextProvider } from './context/userContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <UserContextProvider>
      <App />
      </UserContextProvider>
    </Router>
  </StrictMode>,
)
