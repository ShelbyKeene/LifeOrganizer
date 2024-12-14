import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface City {
  name: string;
  lat: number;
  lon: number;
}

interface CitySearchProps {
  onCitySelect: (city: City) => void;
}

export const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchCities = async () => {
      if (!searchTerm.trim() || searchTerm.length < 3) {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${searchTerm}`, {
          headers: {
            'X-Api-Key': 'hLBJgfUwqauQuU4Hlsrm4w==vkqlXsNidbx25R8Y',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }

        const data = await response.json();
        const cities: City[] = data.map((city: any) => ({
          name: `${city.name}, ${city.country}`,
          lat: city.latitude,
          lon: city.longitude
        }));

        setSearchResults(cities);
      } catch (err) {
        setError('Failed to search cities. Please try again.');
        console.error('City search error:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchCities, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
      </div>

      {loading && (
        <div className="text-white/70 text-center py-2">
          Searching...
        </div>
      )}

      {error && (
        <div className="text-red-400 text-sm text-center py-2">
          {error}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {searchResults.map((city, index) => (
            <button
              key={index}
              onClick={() => onCitySelect(city)}
              className="w-full px-4 py-3 rounded-lg text-left text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              {city.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};