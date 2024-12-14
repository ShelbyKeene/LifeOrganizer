import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useUserSettings } from '../../contexts/UserSettingsContext';
import { CitySearch } from './CitySearch';

interface WeatherSettingsProps {
  onClose: () => void;
}

// Common cities with their coordinates
const commonCities = [
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Toronto', lat: 43.6532, lon: -79.3832 }
];

export const WeatherSettings: React.FC<WeatherSettingsProps> = ({ onClose }) => {
  const { settings, updateSettings } = useUserSettings();
  const [selectedCity, setSelectedCity] = useState(settings.weatherCity.name);

  const handleCityChange = (city: { name: string; lat: number; lon: number }) => {
    updateSettings({
      weatherCity: {
        name: city.name,
        lat: city.lat,
        lon: city.lon
      }
    });
    setSelectedCity(city.name);
    onClose(); // Close the settings panel after selection
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-light text-white">Weather Settings</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-white/70">Search for a city:</p>
          <CitySearch onCitySelect={handleCityChange} />
        </div>

        <div className="space-y-2">
          <p className="text-white/70">Or select a common city:</p>
          <div className="grid gap-2">
            {commonCities.map((city) => (
              <button
                key={city.name}
                onClick={() => handleCityChange(city)}
                className={`
                  w-full px-4 py-3 rounded-lg text-left transition-colors
                  ${selectedCity === city.name
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};