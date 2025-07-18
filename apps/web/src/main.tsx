import React from 'react';
import { createRoot } from 'react-dom/client';
//import 'primereact/resources/themes/lara-light-amber/theme.css';
//import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primereact/resources/themes/md-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './index.css';
import './i18n/i18n';
import { AppRouter } from './router';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
