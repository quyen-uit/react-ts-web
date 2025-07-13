import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AdminLayout from '@/layout/AdminLayout';
import PrivateRoute from './PrivateRoute';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Products = lazy(() => import('@/pages/Products'));
const Unauthorized = lazy(() => import('@/pages/Unauthorized'));

interface AppRoutesProps {
  toggleTheme: () => void;
}

const AppRoutes = ({ toggleTheme }: AppRoutesProps) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<AdminLayout toggleTheme={toggleTheme} />}>
            <Route index element={<Dashboard />} />
            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
              <Route path="products" element={<Products />} />
            </Route>
          </Route>
          <Route path="unauthorized" element={<Unauthorized />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
