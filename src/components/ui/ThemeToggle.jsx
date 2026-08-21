import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-full bg-gradient-to-tr from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200/80 dark:border-gray-700/80 shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 group overflow-hidden ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Subtle Background Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 dark:bg-indigo-500 bg-amber-500 rounded-full blur-md" />

      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <Sun
          className={`w-5 h-5 absolute inset-0 text-amber-500 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDark
              ? 'opacity-0 rotate-90 scale-50'
              : 'opacity-100 rotate-0 scale-100 group-hover:rotate-[20deg] group-hover:text-amber-600'
            }`}
        />

        {/* Moon Icon */}
        <Moon
          className={`w-5 h-5 absolute inset-0 text-indigo-400 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDark
              ? 'opacity-100 rotate-0 scale-100 group-hover:-rotate-[15deg] group-hover:text-indigo-300'
              : 'opacity-0 -rotate-90 scale-50'
            }`}
        />
      </div>
    </button>
  );
}