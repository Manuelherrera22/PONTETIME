import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
)
