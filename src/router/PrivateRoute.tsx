import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import {
  selectCurrentRoles,
  selectCurrentUser,
} from '@/store/slices/authSlice';

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  return <Outlet />;
  const user = useSelector(selectCurrentUser);
  const userRoles = useSelector(selectCurrentRoles);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAllowed = userRoles.some((role) => allowedRoles.includes(role));

  return isAllowed ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default PrivateRoute;
