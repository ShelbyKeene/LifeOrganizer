import { MorningTheme, AfternoonTheme, EveningTheme } from '../types/theme';

export const getThemeBackground = (
  timeOfDay: 'morning' | 'afternoon' | 'evening',
  morningTheme: MorningTheme,
  afternoonTheme: AfternoonTheme,
  eveningTheme: EveningTheme
): string => {
  const backgrounds = {
    morning: {
      sunrise: 'bg-gradient-to-br from-[#8B7355]/90 via-[#B69B4C]/70 to-[#D4B483]/50',
      sage: 'bg-gradient-to-br from-[#4A5D4E]/80 via-[#6B7F6F]/60 to-[#8B9A8D]/40',
      coffee: 'bg-gradient-to-br from-[#2C1810]/95 via-[#4A2C2A]/80 to-[#D2B48C]/60'
    },
    afternoon: {
      butterflies: 'bg-gradient-to-br from-sky-400/60 via-blue-300/40 to-white/30',
      meadow: 'bg-gradient-to-br from-sky-300/40 via-blue-200/30 to-green-500/30',
      stormy: 'bg-gradient-to-br from-slate-600/70 via-blue-400/50 to-slate-300/40'
    },
    evening: {
      purple: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900',
      navy: 'bg-gradient-to-br from-blue-950 via-navy-900 to-slate-900',
      black: 'bg-gradient-to-br from-gray-950 via-slate-900 to-black'
    }
  };

  switch (timeOfDay) {
    case 'morning':
      return backgrounds.morning[morningTheme];
    case 'afternoon':
      return backgrounds.afternoon[afternoonTheme];
    case 'evening':
      return backgrounds.evening[eveningTheme];
  }
};

export const getThemeTextColor = (
  timeOfDay: 'morning' | 'afternoon' | 'evening',
  morningTheme: MorningTheme,
  afternoonTheme: AfternoonTheme
): string => {
  if (timeOfDay === 'morning' && morningTheme !== 'coffee') {
    return 'text-slate-800';
  }
  if (timeOfDay === 'afternoon' && afternoonTheme !== 'stormy') {
    return 'text-slate-700';
  }
  return 'text-white';
};