import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

// Build version for cache busting
// Updated: SEO global positioning (Dec 9, 2024)
const BUILD_VERSION = '20251209.0900';
(window as any).__BUILD_VERSION__ = BUILD_VERSION;

// ============================================
// DISABLE CONSOLE IN PRODUCTION
// ============================================
if (process.env.NODE_ENV === 'production') {
  const noop = () => {};
  console.log = noop;
  console.debug = noop;
  console.info = noop;
  console.warn = noop;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.info('Service Worker registered:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}