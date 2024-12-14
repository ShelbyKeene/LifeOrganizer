import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeSwitcherProps {
  onThemeChange: (theme: 'morning' | 'evening') => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={() => onThemeChange('morning')}
        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Switch to morning theme"
      >
        <Sun className="w-5 h-5" />
      </button>
      <button
        onClick={() => onThemeChange('evening')}
        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Switch to evening theme"
      >
        <Moon className="w-5 h-5" />
      </button>
    </div>
  );
};