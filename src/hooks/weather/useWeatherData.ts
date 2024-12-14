import { useState, useEffect, useCallback } from 'react';
import { WeatherApiError, fetchWeatherData } from '../../services/api/weatherApi';
import { ProcessedWeatherData } from '../../types/weather';
import { processWeatherData } from '../../utils/weatherUtils';
import { WEATHER_CONFIG } from '../../config/constants';

// Default coordinates (London)
const DEFAULT_LAT = 51.5074;
const DEFAULT_LON = -0.1278;

export const useWeatherData = () => {
  const [data, setData] = useState<ProcessedWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await fetchWeatherData(DEFAULT_LAT, DEFAULT_LON);
      setData(processWeatherData(weatherData));
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch weather data');
      }
      setData(prev => prev);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    
    const interval = setInterval(fetchData, WEATHER_CONFIG.REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};