import { useState, useCallback } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
}

interface UseGeolocationReturn extends GeolocationState {
  requestLocation: () => void;
  isSupported: boolean;
}

export function useGeolocation(): UseGeolocationReturn {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: false,
    error: null,
  });

  const isSupported = 'geolocation' in navigator;

  const requestLocation = useCallback(() => {
    if (!isSupported) {
      setState(prev => ({
        ...prev,
        error: 'geolocalizacao nao suportada pelo navegador',
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
          error: null,
        });
      },
      (error) => {
        let errorMessage = 'nao foi possivel obter sua localizacao';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'permissao de localizacao negada';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'localizacao indisponivel';
            break;
          case error.TIMEOUT:
            errorMessage = 'tempo esgotado ao buscar localizacao';
            break;
        }
        
        setState({
          latitude: null,
          longitude: null,
          loading: false,
          error: errorMessage,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 min de cache
      }
    );
  }, [isSupported]);

  return {
    ...state,
    requestLocation,
    isSupported,
  };
}
