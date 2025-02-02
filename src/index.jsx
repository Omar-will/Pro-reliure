import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './Scss/index.scss';
import App from './App';
import 'leaflet/dist/leaflet.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider> {/* ✅ Ajout du HelmetProvider */}
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
