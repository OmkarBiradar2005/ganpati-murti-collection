import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ShieldAlert, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (admin) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await login(form.email, form.password);
      toast.success('Admin login successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-festive px-4 py-12 text-white">
      <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-stone-900"><ShieldAlert /></div>
          <div>
            <h1 className="text-2xl font-display font-bold">Admin Login</h1>
            <p className="text-sm text-stone-200">Owner only access</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Admin email" className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none placeholder:text-stone-300" />
          <input type="password" required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Password" className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none placeholder:text-stone-300" />
          <button disabled={loading} className="btn-primary w-full justify-center bg-white text-stone-900 disabled:opacity-70">
            <LogIn size={18} /> {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-5 text-xs text-stone-200">No public registration. Use the owner credentials from your .env file.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
