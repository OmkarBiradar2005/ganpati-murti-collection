import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { siteConfig } from './data/siteConfig';
import { CartDrawer } from './components/CartDrawer';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/': `${siteConfig.name} | Book Your Ganpati Murti Today`,
      '/admin': `Admin Login | ${siteConfig.ownerName}`,
      '/dashboard': `Admin Dashboard | ${siteConfig.ownerName}`,
    };
    document.title = titles[location.pathname] || siteConfig.name;
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== '/admin' && location.pathname !== '/dashboard' ? <Navbar /> : null}
      {location.pathname !== '/admin' && location.pathname !== '/dashboard' ? <CartDrawer /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};

export default App;
