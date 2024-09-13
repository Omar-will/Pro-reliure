import React from 'react';
import ReactDOM from 'react-dom/client';
import './Scss/index.scss';
import App from './App';
import 'leaflet/dist/leaflet.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
