import { Suspense, lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import adminRoutes from './adminRoutes';
import clientRoutes from './clientRoutes';

const Login = lazy(() => import('@/pages/auth/Login'));
const Unauthorized = lazy(() => import('@/pages/admin/Unauthorized'));

const AppRoutes = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  ...adminRoutes,
  ...clientRoutes,
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
