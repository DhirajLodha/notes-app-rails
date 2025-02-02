import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Modal from 'react-modal'; // Import react-modal
import './index.css'
import App from './App.jsx'

Modal.setAppElement('#root'); // This makes the modal accessible

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
