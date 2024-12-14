import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';
import { WeatherCondition } from '../../types/weather';

interface WeatherIconProps {
  condition: WeatherCondition;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className = "w-12 h-12" }) => {
  const icons = {
    clear: <Sun className={`${className} text-yellow-400`} />,
    cloudy: <Cloud className={`${className} text-gray-400`} />,
    rain: <CloudRain className={`${className} text-blue-400`} />,
    snow: <CloudSnow className={`${className} text-blue-200`} />,
    storm: <CloudLightning className={`${className} text-purple-400`} />
  };

  return icons[condition] || <Cloud className={`${className} text-gray-400`} />;
};