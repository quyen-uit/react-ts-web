import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminRoutes from './adminRoutes';
import ClientRoutes from './ClientRoutes';

const Login = lazy(() => import('@/pages/auth/Login'));
const Unauthorized = lazy(() => import('@/pages/auth/Unauthorized'));

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
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
