import { useState, useCallback } from 'react';
import type { WeatherData, WeatherError } from '@/types';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: WeatherError | null;
  searchLocation: (location: string) => Promise<void>;
  searchByCoords: (lat: number, lon: number) => Promise<void>;
  clearError: () => void;
}

export function useWeather(): UseWeatherReturn {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<WeatherError | null>(null);

  const fetchWeather = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=5&aqi=no&lang=pt`;
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw {
          code: errorData.error?.code || response.status,
          message: errorData.error?.message || 'falha ao buscar dados do tempo',
        };
      }

      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (err) {
      if (err && typeof err === 'object' && 'code' in err && 'message' in err) {
        setError(err as WeatherError);
      } else {
        setError({
          code: 0,
          message: 'erro inesperado. tenta de novo.',
        });
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchLocation = useCallback(async (location: string) => {
    await fetchWeather(location);
  }, [fetchWeather]);

  const searchByCoords = useCallback(async (lat: number, lon: number) => {
    await fetchWeather(`${lat},${lon}`);
  }, [fetchWeather]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weather,
    loading,
    error,
    searchLocation,
    searchByCoords,
    clearError,
  };
}
