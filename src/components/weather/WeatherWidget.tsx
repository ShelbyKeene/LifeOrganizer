import React, { useState } from 'react';
import { Search, Wind } from 'lucide-react';
import { useWeatherData } from '../../hooks/weather/useWeatherData';
import { WeatherIcon } from './WeatherIcon';
import { WEATHER_CONFIG } from '../../config/constants';

export const WeatherWidget: React.FC = () => {
  const [city, setCity] = useState(WEATHER_CONFIG.DEFAULT_CITY);
  const [isEditing, setIsEditing] = useState(false);
  const [inputCity, setInputCity] = useState(city);
  const { data: weather, loading, error, refetch } = useWeatherData(city);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
      setIsEditing(false);
      await refetch();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-light text-white">Weather</h3>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              className="px-3 py-1 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none text-sm"
              placeholder="Enter city..."
              autoFocus
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            {city}
          </button>
        )}
      </div>
      
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