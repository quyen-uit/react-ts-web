import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = (user: any) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};
