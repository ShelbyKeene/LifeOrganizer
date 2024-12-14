import { WeatherApiResponse, WeatherCondition, ProcessedWeatherData } from '../types/weather';

export const determineWeatherCondition = (data: WeatherApiResponse): WeatherCondition => {
  const { cloud_pct } = data;
  
  if (cloud_pct >= 85) {
    return 'storm';
  }
  if (cloud_pct >= 65) {
    return 'rain';
  }
  if (cloud_pct >= 30) {
    return 'cloudy';
  }
  return 'clear';
};

export const processWeatherData = (data: WeatherApiResponse): ProcessedWeatherData => {
  return {
    temp: Math.round(data.temp),
    condition: determineWeatherCondition(data),
    humidity: data.humidity,
    windSpeed: Math.round(data.wind_speed),
    feelsLike: Math.round(data.feels_like),
    minTemp: Math.round(data.min_temp),
    maxTemp: Math.round(data.max_temp)
  };
};