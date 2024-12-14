import React from 'react';
import { useThemeContext } from '../../contexts/ThemeContext';
import { TimeIcon } from '../TimeIcon';
import { Stars } from '../Stars';
import { MorningThemeSelector } from './MorningThemeSelector';
import { AfternoonThemeSelector } from './AfternoonThemeSelector';
import { EveningThemeSelector } from './EveningThemeSelector';
import { Butterflies } from './animations/Butterflies';
import { Clouds } from './animations/Clouds';
import { Grass } from './animations/Grass';
import { getThemeBackground, getThemeTextColor } from '../../utils/themeUtils';

export const ThemeContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    morningTheme,
    setMorningTheme,
    afternoonTheme,
    setAfternoonTheme,
    eveningTheme,
    setEveningTheme,
    forcedTimeOfDay
  } = useThemeContext();

  const timeOfDay = forcedTimeOfDay || getTimeOfDay();
  const background = getThemeBackground(timeOfDay, morningTheme, afternoonTheme, eveningTheme);
  const textColor = getThemeTextColor(timeOfDay, morningTheme, afternoonTheme);

  const renderThemeSelector = () => {
    switch (timeOfDay) {
      case 'morning':
        return (
          <MorningThemeSelector
            currentTheme={morningTheme}
            onThemeChange={setMorningTheme}
          />
        );
      case 'afternoon':
        return (
          <AfternoonThemeSelector
            currentTheme={afternoonTheme}
            onThemeChange={setAfternoonTheme}
          />
        );
      case 'evening':
        return (
          <EveningThemeSelector
            currentTheme={eveningTheme}
            onThemeChange={setEveningTheme}
          />
        );
    }
  };

  const renderBackgroundEffects = () => {
    if (timeOfDay === 'evening') {
      return <Stars />;
    }
    
    if (timeOfDay === 'afternoon') {
      return (
        <>
          <Clouds darkMode={afternoonTheme === 'stormy'} />
          {afternoonTheme === 'butterflies' && <Butterflies />}
          {afternoonTheme === 'meadow' && <Grass />}
        </>
      );
    }
    
    return null;
  };

  return (
    <div className={`min-h-screen ${background} ${textColor} transition-colors duration-1000 relative overflow-hidden`}>
      {renderBackgroundEffects()}
      {renderThemeSelector()}
      <TimeIcon timeOfDay={timeOfDay} />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </div>
    </div>
  );
};