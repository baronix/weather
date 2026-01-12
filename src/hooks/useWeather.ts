import { useCallback } from 'react';
import { useWeatherStore } from '@/store';
import type { WeatherData } from '@/types';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export function useWeather() {
  const {
    weather,
    loading,
    error,
    lastUpdated,
    currentLocation,
    unit,
    language,
    setWeather,
    setLoading,
    setError,
    setCurrentLocation,
    clearWeather,
  } = useWeatherStore();

  const fetchWeather = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // busca previsao de 7 dias com aqi e alertas
      const lang = language === 'pt' ? 'pt' : 'en';
      const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=7&aqi=yes&alerts=yes&lang=${lang}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'falha ao buscar dados do tempo');
      }

      const data: WeatherData = await response.json();
      setWeather(data);
      setCurrentLocation(query);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'erro inesperado. tenta de novo.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [language, setWeather, setLoading, setError, setCurrentLocation]);

  const searchLocation = useCallback(async (location: string) => {
    await fetchWeather(location);
  }, [fetchWeather]);

  const searchByCoords = useCallback(async (lat: number, lon: number) => {
    await fetchWeather(`${lat},${lon}`);
  }, [fetchWeather]);

  const refresh = useCallback(async () => {
    if (currentLocation) {
      await fetchWeather(currentLocation);
    }
  }, [currentLocation, fetchWeather]);

  return {
    weather,
    loading,
    error,
    lastUpdated,
    currentLocation,
    unit,
    searchLocation,
    searchByCoords,
    refresh,
    clearWeather,
  };
}
