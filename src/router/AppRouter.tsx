import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AdminLayout from '@/layout/AdminLayout';
import PrivateRoute from './PrivateRoute';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Products = lazy(() => import('@/pages/Products'));
const Unauthorized = lazy(() => import('@/pages/Unauthorized'));

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
