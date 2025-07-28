import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import ClientRoutes from './ClientRoutes';
import { Login, Unauthorized } from '@/pages/auth';

const AppRoutes = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  ...AdminRoutes,
  ...ClientRoutes,
  {
    path: 'unauthorized',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Unauthorized />
      </Suspense>
    ),
  },
]);

export default AppRoutes;
