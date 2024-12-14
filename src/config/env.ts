// Helper function to get environment variables with type safety
export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    console.warn(`Environment variable ${key} is not defined`);
    return '';
  }
  return value;
};

// Environment configuration object
export const ENV = {
  WEATHER_API_KEY: getEnvVar('VITE_WEATHER_API_KEY'),
  // Add other environment variables here
};