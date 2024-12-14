import { useState, useEffect, useCallback } from 'react';
import { ProcessedWeatherData } from '../types/weather';
import { fetchWeatherData } from '../services/weatherService';
import { processWeatherData } from '../utils/weatherUtils';

export const useWeather = (lat?: number, lon?: number) => {
  const [weather, setWeather] = useState<ProcessedWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData(lat, lon);
      const processedData = processWeatherData(data);
      setWeather(processedData);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Failed to fetch weather data. Please try again later.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      if (!mounted) return;
      await getWeather();
    };

    fetchData();

    // Refresh weather data every 10 minutes
    const interval = setInterval(fetchData, 10 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [getWeather]);

  return { weather, loading, error };
};