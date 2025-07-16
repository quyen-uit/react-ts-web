import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentUser,
  login as loginAction,
  logout as logoutAction,
} from '../app/features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const login = (userData: any) => {
    dispatch(loginAction(userData));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return { user, login, logout };
};
