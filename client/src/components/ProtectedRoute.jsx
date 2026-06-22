import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return <div className="p-10 text-center text-stone-500">Checking admin session...</div>;
  }

  if (!admin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};
