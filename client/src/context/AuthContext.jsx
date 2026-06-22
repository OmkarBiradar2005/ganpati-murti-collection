import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ganpati-admin-token');
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get('/auth/me')
      .then((response) => setAdmin(response.data.admin))
      .catch(() => {
        localStorage.removeItem('ganpati-admin-token');
        setAdmin(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('ganpati-admin-token', response.data.token);
    setAdmin(response.data.admin);
    return response.data.admin;
  };

  const logout = () => {
    localStorage.removeItem('ganpati-admin-token');
    setAdmin(null);
  };

  return <AuthContext.Provider value={{ admin, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
