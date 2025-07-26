import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx'
import './index.css'
import { init as initAnalytics } from './analytics';

// Inicializa Google Analytics
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (measurementId) {
  initAnalytics(measurementId);
} else {
  console.warn('VITE_GA_MEASUREMENT_ID no está definida. El seguimiento de Analytics está desactivado.');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

