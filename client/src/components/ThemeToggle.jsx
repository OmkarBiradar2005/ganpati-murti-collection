import { MoonStar, SunMedium } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme} className="btn-secondary px-4 py-2">
      {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
      <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
};
