import React from 'react';
import { Cloud } from 'lucide-react';
import { AfternoonTheme } from '../../types/theme';

interface AfternoonThemeSelectorProps {
  currentTheme: AfternoonTheme;
  onThemeChange: (theme: AfternoonTheme) => void;
}

export const AfternoonThemeSelector: React.FC<AfternoonThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const themes: { id: AfternoonTheme; label: string; description: string }[] = [
    { 
      id: 'butterflies', 
      label: 'Summer Sky',
      description: 'Bright blue skies with dancing butterflies'
    },
    { 
      id: 'meadow', 
      label: 'Green Meadow',
      description: 'Rolling hills with a grassy horizon'
    },
    { 
      id: 'stormy', 
      label: 'Stormy Skies',
      description: 'Dramatic cloudy atmosphere'
    }
  ];

  return (
    <div className="absolute top-4 left-4 z-20">
      <div className="relative group">
        <button
          className={`
            p-2 rounded-lg transition-colors
            ${currentTheme === 'stormy'
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-slate-800/10 hover:bg-slate-800/20 text-slate-800'
            }
          `}
          aria-label="Theme settings"
        >
          <Cloud className="w-5 h-5" />
        </button>

        <div className={`
          absolute left-0 mt-2 w-64 py-2 rounded-lg shadow-lg 
          opacity-0 invisible group-hover:opacity-100 group-hover:visible 
          transition-all duration-200
          ${currentTheme === 'stormy'
            ? 'bg-white/20 backdrop-blur-lg'
            : 'bg-white/80 backdrop-blur-lg'
          }
        `}>
          <div className={`px-3 py-2 text-sm ${
            currentTheme === 'stormy' ? 'text-white/70' : 'text-slate-600'
          }`}>
            Afternoon Theme
          </div>
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`
                w-full px-3 py-2 text-left transition-colors
                ${currentTheme === theme.id
                  ? currentTheme === 'stormy'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-800/10 text-slate-800'
                  : currentTheme === 'stormy'
                    ? 'text-white/70 hover:bg-white/10 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-800/5 hover:text-slate-800'
                }
              `}
            >
              <div className="space-y-1">
                <div>{theme.label}</div>
                <div className={`text-xs ${
                  currentTheme === 'stormy' ? 'text-white/50' : 'text-slate-500'
                }`}>
                  {theme.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};