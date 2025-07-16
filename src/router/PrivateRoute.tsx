import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectCurrentRoles } from '@/app/features/auth/authSlice';

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const userRoles = useSelector(selectCurrentRoles);

  const isAllowed = userRoles.some((role) => allowedRoles.includes(role));

  return isAllowed ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default PrivateRoute;
