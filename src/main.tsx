import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { FavoritesProvider } from './contexts/FavoritesContext.tsx'
import './i18n/config'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
