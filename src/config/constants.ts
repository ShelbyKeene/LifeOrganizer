import { ENV } from './env';

export const WEATHER_CONFIG = {
  API_KEY: ENV.WEATHER_API_KEY,
  BASE_URL: 'https://api.api-ninjas.com/v1/weather',
  REFRESH_INTERVAL: 30 * 60 * 1000, // 30 minutes
  DEFAULT_CITY: 'London'
};

export const WEATHER_ERRORS = {
  INVALID_API_KEY: 'Weather service configuration error. Please try again later.',
  INVALID_CITY: 'Please enter a valid city name.',
  INVALID_RESPONSE: 'Invalid response received from weather service.',
  NETWORK_ERROR: 'Unable to connect to weather service. Please check your connection.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again later.',
  MISSING_API_KEY: 'Weather service is not properly configured.'
};