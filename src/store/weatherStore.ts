import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WeatherData } from '@/types';

// tipos pro store
export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type Theme = 'light' | 'dark' | 'auto';
export type Language = 'pt' | 'en';

interface FavoriteLocation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface WeatherState {
  // dados do tempo
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  
  // localizacao atual
  currentLocation: string | null;
  
  // favoritos
  favorites: FavoriteLocation[];
  
  // configuracoes
  unit: TemperatureUnit;
  theme: Theme;
  language: Language;
  autoRefresh: boolean;
  refreshInterval: number; // em minutos
  
  // acoes
  setWeather: (weather: WeatherData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentLocation: (location: string | null) => void;
  
  addFavorite: (location: FavoriteLocation) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (name: string) => boolean;
  
  setUnit: (unit: TemperatureUnit) => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setAutoRefresh: (autoRefresh: boolean) => void;
  setRefreshInterval: (interval: number) => void;
  
  clearWeather: () => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      // estado inicial
      weather: null,
      loading: false,
      error: null,
      lastUpdated: null,
      currentLocation: null,
      favorites: [],
      unit: 'celsius',
      theme: 'auto',
      language: 'pt',
      autoRefresh: true,
      refreshInterval: 30,
      
      // acoes de dados
      setWeather: (weather) => set({ 
        weather, 
        lastUpdated: Date.now(),
        error: null 
      }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error, loading: false }),
      setCurrentLocation: (location) => set({ currentLocation: location }),
      
      // acoes de favoritos
      addFavorite: (location) => set((state) => ({
        favorites: [...state.favorites, location]
      })),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter((f) => f.id !== id)
      })),
      isFavorite: (name) => {
        const state = get();
        return state.favorites.some((f) => f.name.toLowerCase() === name.toLowerCase());
      },
      
      // acoes de configuracao
      setUnit: (unit) => set({ unit }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setAutoRefresh: (autoRefresh) => set({ autoRefresh }),
      setRefreshInterval: (interval) => set({ refreshInterval: interval }),
      
      clearWeather: () => set({ weather: null, error: null, currentLocation: null }),
    }),
    {
      name: 'weather-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        unit: state.unit,
        theme: state.theme,
        language: state.language,
        autoRefresh: state.autoRefresh,
        refreshInterval: state.refreshInterval,
      }),
    }
  )
);
