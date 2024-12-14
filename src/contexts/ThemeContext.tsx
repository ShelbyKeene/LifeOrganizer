import React, { createContext, useContext, useState } from 'react';
import { MorningTheme, AfternoonTheme, EveningTheme } from '../types/theme';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ThemeContextType {
  morningTheme: MorningTheme;
  setMorningTheme: (theme: MorningTheme) => void;
  afternoonTheme: AfternoonTheme;
  setAfternoonTheme: (theme: AfternoonTheme) => void;
  eveningTheme: EveningTheme;
  setEveningTheme: (theme: EveningTheme) => void;
  forcedTimeOfDay: 'morning' | 'afternoon' | 'evening' | null;
  setForcedTimeOfDay: (time: 'morning' | 'afternoon' | 'evening' | null) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [morningTheme, setMorningTheme] = useLocalStorage<MorningTheme>('morning-theme', 'sunrise');
  const [afternoonTheme, setAfternoonTheme] = useLocalStorage<AfternoonTheme>('afternoon-theme', 'butterflies');
  const [eveningTheme, setEveningTheme] = useLocalStorage<EveningTheme>('evening-theme', 'purple');
  const [forcedTimeOfDay, setForcedTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | null>(null);

  return (
    <ThemeContext.Provider value={{
      morningTheme,
      setMorningTheme,
      afternoonTheme,
      setAfternoonTheme,
      eveningTheme,
      setEveningTheme,
      forcedTimeOfDay,
      setForcedTimeOfDay,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};