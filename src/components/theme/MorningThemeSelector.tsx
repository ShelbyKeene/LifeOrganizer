import React from 'react';
import { Sun } from 'lucide-react';
import { MorningTheme } from '../../types/theme';

interface MorningThemeSelectorProps {
  currentTheme: MorningTheme;
  onThemeChange: (theme: MorningTheme) => void;
}

export const MorningThemeSelector: React.FC<MorningThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const themes: { id: MorningTheme; label: string; gradient: string }[] = [
    {
      id: 'sunrise',
      label: 'Golden Sunrise',
      gradient: 'from-[#8B7355]/90 via-[#B69B4C]/70 to-[#D4B483]/50'
    },
    {
      id: 'sage',
      label: 'Farmhouse Sage',
      gradient: 'from-[#4A5D4E]/80 via-[#6B7F6F]/60 to-[#8B9A8D]/40'
    },
    {
      id: 'coffee',
      label: 'Rich Espresso',
      gradient: 'from-[#2C1810]/95 via-[#4A2C2A]/80 to-[#D2B48C]/60'
    }
  ];

  return (
    <div className="absolute top-4 left-4 z-20">
      <div className="relative group">
        <button
          className={`p-2 rounded-lg transition-colors ${
            currentTheme === 'coffee' 
              ? 'bg-white/10 hover:bg-white/20 text-white' 
              : 'bg-slate-800/10 hover:bg-slate-800/20 text-slate-800'
          }`}
          aria-label="Theme settings"
        >
          <Sun className="w-5 h-5" />
        </button>

        <div className={`
          absolute left-0 mt-2 w-48 py-2 rounded-lg shadow-lg 
          opacity-0 invisible group-hover:opacity-100 group-hover:visible 
          transition-all duration-200
          ${currentTheme === 'coffee'
            ? 'bg-white/20 backdrop-blur-lg'
            : 'bg-white/80 backdrop-blur-lg'
          }
        `}>
          <div className={`px-3 py-2 text-sm ${
            currentTheme === 'coffee' ? 'text-white/70' : 'text-slate-600'
          }`}>
            Morning Theme
          </div>
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`
                w-full px-3 py-2 text-left transition-colors
                ${currentTheme === theme.id
                  ? currentTheme === 'coffee'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-800/10 text-slate-800'
                  : currentTheme === 'coffee'
                    ? 'text-white/70 hover:bg-white/10 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-800/5 hover:text-slate-800'
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