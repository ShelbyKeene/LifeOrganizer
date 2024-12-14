import React from 'react';
import { Sun, Cloud, Moon } from 'lucide-react';

interface ThemeToggleProps {
  onThemeChange: (theme: 'morning' | 'afternoon' | 'evening' | null) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ onThemeChange }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <button
        onClick={() => onThemeChange('morning')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white/70 hover:text-white"
      >
        <Sun className="w-4 h-4" />
        <span className="text-sm">Morning</span>
      </button>
      <button
        onClick={() => onThemeChange('afternoon')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white/70 hover:text-white"
      >
        <Cloud className="w-4 h-4" />
        <span className="text-sm">Afternoon</span>
      </button>
      <button
        onClick={() => onThemeChange('evening')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white/70 hover:text-white"
      >
        <Moon className="w-4 h-4" />
        <span className="text-sm">Evening</span>
      </button>
      <button
        onClick={() => onThemeChange(null)}
        className="col-span-3 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white/70 hover:text-white text-sm"
      >
        Reset to Natural Time
      </button>
    </div>
  );
};