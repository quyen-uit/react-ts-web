import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import AdminLayout from '@/layout/AdminLayout';
import PrivateRoute from './PrivateRoute';

const Dashboard = lazy(() => import('@/pages/admin/Dashboard/Dashboard'));
// const Products = lazy(() => import('@/pages/admin/Products'));
const Users = lazy(() => import('@/pages/admin/Users/UsersPage'));
const Settings = lazy(() => import('@/pages/admin/Settings'));
const Permissions = lazy(() => import('@/pages/admin/Permissions.tsx'));

const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        element: <PrivateRoute allowedRoles={[]} />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={['admin']} />,
        children: [
          // {
          //   path: 'products',
          //   element: (
          //     <Suspense fallback={<div>Loading...</div>}>
          //       <Products />
          //     </Suspense>
          //   ),
          // },
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
          {
            path: 'permissions',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Permissions />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
