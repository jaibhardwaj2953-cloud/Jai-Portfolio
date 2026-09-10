import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = '',
  showLabel = false,
}) => {
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      id="theme-toggle-button"
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-colors border select-none cursor-pointer ${
        isDark
          ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-amber-300 fill-amber-300/30" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500 fill-amber-500/30" />
          )}
        </motion.div>
      </div>

      {showLabel && (
        <span className="text-xs font-medium">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </motion.button>
  );
};
