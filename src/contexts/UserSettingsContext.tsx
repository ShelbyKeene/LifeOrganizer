import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TemperatureUnit } from '../types/weather';

interface UserSettings {
  name: string;
  weatherCity: {
    name: string;
    lat: number;
    lon: number;
  };
  temperatureUnit: TemperatureUnit;
}

interface UserSettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

const defaultSettings: UserSettings = {
  name: 'Guest',
  weatherCity: {
    name: 'London',
    lat: 51.5074,
    lon: -0.1278
  },
  temperatureUnit: 'fahrenheit'
};

const UserSettingsContext = createContext<UserSettingsContextType | null>(null);

export const useUserSettings = () => {
  const context = useContext(UserSettingsContext);
  if (!context) {
    throw new Error('useUserSettings must be used within a UserSettingsProvider');
  }
  return context;
};

export const UserSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useLocalStorage<UserSettings>('user-settings', defaultSettings);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
      weatherCity: {
        ...prev.weatherCity,
        ...(newSettings.weatherCity || {})
      }
    }));
  };

  const completeSettings: UserSettings = {
    ...defaultSettings,
    ...settings,
    weatherCity: {
      ...defaultSettings.weatherCity,
      ...(settings.weatherCity || {})
    }
  };

  return (
    <UserSettingsContext.Provider value={{ settings: completeSettings, updateSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
};