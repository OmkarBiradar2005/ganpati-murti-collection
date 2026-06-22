import { Menu, X, ShieldCheck, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { ThemeToggle } from './ThemeToggle';
import { useCart } from '../context/CartContext';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Featured', to: '/#featured' },
  { label: 'Gallery', to: '/#gallery' },
  { label: 'Contact', to: '/#contact' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { itemCount, setOpen: setCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/85 dark:bg-stone-950/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-saffron-500 to-maroon-600 text-white shadow-glow">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-lg font-display font-bold leading-none">{siteConfig.name}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Festive catalog</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.to} className="text-sm font-medium text-stone-600 hover:text-saffron-600 dark:text-stone-300 dark:hover:text-saffron-300">
              {item.label}
            </a>
          ))}
          <button type="button" onClick={() => setCartOpen(true)} className="btn-secondary px-4 py-2">
            <ShoppingCart size={18} />
            Cart {itemCount > 0 ? `(${itemCount})` : ''}
          </button>
          <Link to="/admin" className="btn-secondary px-4 py-2">
            Admin
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button type="button" onClick={() => setCartOpen(true)} className="btn-secondary p-3">
            <ShoppingCart size={18} />
            {itemCount > 0 ? <span className="ml-1 text-xs font-bold">{itemCount}</span> : null}
          </button>
          <ThemeToggle />
          <button type="button" onClick={() => setOpen((value) => !value)} className="btn-secondary p-3">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-white dark:bg-stone-950 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pb-5 pt-3 sm:px-6 lg:px-8">
            {navItems.map((item) => (
              <a key={item.label} href={item.to} onClick={() => setOpen(false)} className="rounded-2xl px-3 py-3 text-sm font-medium text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-900">
                {item.label}
              </a>
            ))}
            <button type="button" onClick={() => { setCartOpen(true); setOpen(false); }} className="rounded-2xl px-3 py-3 text-left text-sm font-medium text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-900">
              Cart {itemCount > 0 ? `(${itemCount})` : ''}
            </button>
            <Link to="/admin" onClick={() => setOpen(false)} className="rounded-2xl bg-saffron-500 px-3 py-3 text-sm font-semibold text-white">
              Admin Login
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
};
