import React from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import ErrorBoundary from '@/components/shared/ErrorBoundary/ErrorBoundary';
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
        <ErrorBoundary>
          <RouterProvider router={AppRoutes} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
