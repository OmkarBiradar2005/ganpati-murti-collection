import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="grid min-h-screen place-items-center bg-festive px-4 text-white">
    <div className="max-w-lg text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-white/70">404</p>
      <h1 className="mt-4 text-5xl font-display font-bold">Page not found</h1>
      <p className="mt-4 text-stone-200">The page you were looking for does not exist. Return to the Ganpati catalog or open the admin panel.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="btn-primary bg-white text-stone-900">Home</Link>
        <Link to="/admin" className="btn-secondary border-white/20 bg-white/10 text-white">Admin</Link>
      </div>
    </div>
  </div>
);

export default NotFound;
