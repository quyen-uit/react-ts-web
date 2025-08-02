import { lazy } from 'react';

import AdminLayout from '@/layout/AdminLayout';
import Suspense from '@/components/shared/Suspense/Suspense';
import PrivateRoute from './PrivateRoute';
import type { RouteObject } from 'react-router-dom';

const Dashboard = lazy(() => import('@/pages/admin/Dashboard/Dashboard'));
const UsersPage = lazy(() => import('@/pages/admin/Users/UsersPage'));
const Settings = lazy(() => import('@/pages/admin/Settings'));
const Permissions = lazy(() => import('@/pages/admin/Permissions'));

const AdminRoutes: RouteObject[] = [
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
              <Suspense>
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
          //     <Suspense>
          //       <Products />
          //     </Suspense>
          //   ),
          // },
          {
            path: 'users',
            element: (
              <Suspense>
                <UsersPage />
              </Suspense>
            ),
          },
          {
            path: 'settings',
            element: (
              <Suspense>
                <Settings />
              </Suspense>
            ),
          },
          {
            path: 'permissions',
            element: (
              <Suspense>
                <Permissions />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];

export default AdminRoutes;
