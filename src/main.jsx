import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WeatherApp from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherApp />
  </StrictMode>,
);
