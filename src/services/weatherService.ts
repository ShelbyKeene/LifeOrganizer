import { WeatherApiResponse } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.api-ninjas.com/v1/weather';

// Default coordinates for London
const DEFAULT_LAT = 51.5074;
const DEFAULT_LON = -0.1278;

export const fetchWeatherData = async (lat: number = DEFAULT_LAT, lon: number = DEFAULT_LON): Promise<WeatherApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Weather API Error:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Validate the response data
    if (!data || typeof data.temp === 'undefined') {
      throw new Error('Invalid weather data received');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};