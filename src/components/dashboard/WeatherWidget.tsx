import React from 'react';
import { Wind } from 'lucide-react';
import { useWeatherData } from '../../hooks/weather/useWeatherData';
import { WeatherIcon } from '../weather/WeatherIcon';

export const WeatherWidget: React.FC = () => {
  const { data: weather, loading, error } = useWeatherData();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-light text-white">Weather in London</h3>
      
      <div className="min-h-[100px] flex items-center justify-center">
        {loading ? (
          <div className="text-white/70">Loading weather data...</div>
        ) : error ? (
          <div className="text-red-400 text-center max-w-xs">{error}</div>
        ) : weather ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <WeatherIcon condition={weather.condition} />
              <div>
                <div className="text-3xl font-light text-white">
                  {weather.temp}°C
                </div>
                <div className="text-white/70">
                  Feels like {weather.feelsLike}°C
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-right">
              <div className="text-white/70">
                Humidity: {weather.humidity}%
              </div>
              <div className="text-white/70 flex items-center justify-end gap-1">
                <Wind className="w-4 h-4" />
                {weather.windSpeed} km/h
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};