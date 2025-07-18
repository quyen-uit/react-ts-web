import React from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import AppRoutes from '@/router/AppRouter';
import '@/index.css';
import '@/locales/i18n';

import { store } from './store/store';
import theme from './theme/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme} defaultMode="light" noSsr>
        <CssBaseline />
        <RouterProvider router={AppRoutes} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
