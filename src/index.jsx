// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';      // Aquí se importan las directivas de Tailwind (base, components, utilities)
import App from './App';   // Tu componente raíz donde ya definiste <BrowserRouter> y las rutas

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
