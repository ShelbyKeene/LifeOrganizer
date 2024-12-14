import { MorningTheme, AfternoonTheme, EveningTheme } from '../types/theme';

export const morningThemes: { id: MorningTheme; label: string; gradient: string }[] = [
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

export const afternoonThemes: { id: AfternoonTheme; label: string; description: string }[] = [
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

export const eveningThemes: { id: EveningTheme; label: string; gradient: string }[] = [
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