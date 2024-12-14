export interface WeatherApiResponse {
  wind_speed: number;
  wind_degrees: number;
  temp: number;
  humidity: number;
  sunset: number;
  min_temp: number;
  cloud_pct: number;
  feels_like: number;
  sunrise: number;
  max_temp: number;
}

export type WeatherCondition = 'clear' | 'cloudy' | 'rain' | 'storm';

export interface ProcessedWeatherData {
  temp: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
}