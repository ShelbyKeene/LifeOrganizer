import { WEATHER_CONFIG, WEATHER_ERRORS } from '../../config/constants';
import { WeatherApiResponse } from '../../types/weather';

export class WeatherApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherApiResponse> => {
  try {
    const response = await fetch(
      `${WEATHER_CONFIG.BASE_URL}?lat=${lat}&lon=${lon}`,
      {
        method: 'GET',
        headers: {
          'X-Api-Key': WEATHER_CONFIG.API_KEY,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new WeatherApiError(WEATHER_ERRORS.INVALID_API_KEY, response.status);
      }
      
      const errorText = await response.text();
      throw new WeatherApiError(
        errorText || WEATHER_ERRORS.UNKNOWN_ERROR,
        response.status
      );
    }

    const data = await response.json();
    
    if (!data || typeof data.temp === 'undefined') {
      throw new WeatherApiError(WEATHER_ERRORS.INVALID_RESPONSE);
    }

    return data;
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    
    if (error instanceof TypeError) {
      throw new WeatherApiError(WEATHER_ERRORS.NETWORK_ERROR);
    }
    
    throw new WeatherApiError(WEATHER_ERRORS.UNKNOWN_ERROR);
  }
};