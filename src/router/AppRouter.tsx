import { Suspense, lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import AdminLayout from '@/layout/admin/AdminLayout';

import PrivateRoute from './PrivateRoute';

const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const Products = lazy(() => import('@/pages/admin/Products'));
const Unauthorized = lazy(() => import('@/pages/admin/Unauthorized'));
const Users = lazy(() => import('@/pages/admin/Users'));
const Settings = lazy(() => import('@/pages/admin/Settings'));

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        element: <PrivateRoute allowedRoles={['admin']} />,
        children: [
          {
            path: 'products',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Products />
              </Suspense>
            ),
          },
          {
            path: 'users',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Users />
              </Suspense>
            ),
          },
          {
            path: 'settings',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Settings />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
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
