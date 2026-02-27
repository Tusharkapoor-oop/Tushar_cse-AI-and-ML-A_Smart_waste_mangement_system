import React from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import * as Sentry from '@sentry/react';
import App from './App';
import './index.css';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN || '',
  tracesSampleRate: 0.2
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);
