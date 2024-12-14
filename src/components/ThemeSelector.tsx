import React from 'react';
import { EveningTheme } from '../types/theme';
import { Moon } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: EveningTheme;
  onThemeChange: (theme: EveningTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const themes: { id: EveningTheme; label: string; gradient: string }[] = [
    {
      id: 'purple',
      label: 'Mystic Purple',
      gradient: 'from-indigo-900 via-purple-900 to-slate-900'
    },
    {
      id: 'navy',
      label: 'Deep Navy',
      gradient: 'from-blue-950 via-navy-900 to-slate-900'
    },
    {
      id: 'black',
      label: 'Dark Night',
      gradient: 'from-gray-950 via-slate-900 to-black'
    }
  ];

  return (
    <div className="absolute top-4 left-4 z-20">
      <div className="relative group">
        <button
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Theme settings"
        >
          <Moon className="w-5 h-5" />
        </button>

        <div className="absolute left-0 mt-2 w-48 py-2 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="px-3 py-2 text-sm text-white/70">Evening Theme</div>
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`
                w-full px-3 py-2 text-left transition-colors
                ${currentTheme === theme.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded bg-gradient-to-br ${theme.gradient}`} />
                {theme.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};