import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { MorningTheme, AfternoonTheme, EveningTheme } from '../types/theme';
import { getTimeOfDay } from '../utils/timeUtils';

export const useTheme = (forcedTimeOfDay?: 'morning' | 'afternoon' | 'evening' | null) => {
  const [morningTheme, setMorningTheme] = useLocalStorage<MorningTheme>('morning-theme', 'sunrise');
  const [afternoonTheme, setAfternoonTheme] = useLocalStorage<AfternoonTheme>('afternoon-theme', 'butterflies');
  const [eveningTheme, setEveningTheme] = useLocalStorage<EveningTheme>('evening-theme', 'purple');
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState(getTimeOfDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeOfDay(getTimeOfDay());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const timeOfDay = forcedTimeOfDay || currentTimeOfDay;

  return {
    timeOfDay,
    morningTheme,
    setMorningTheme,
    afternoonTheme,
    setAfternoonTheme,
    eveningTheme,
    setEveningTheme,
  };
};