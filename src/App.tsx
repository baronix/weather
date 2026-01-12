import { useEffect } from 'react';
import { useWeather, useGeolocation } from '@/hooks';
import {
  SearchBar,
  CurrentWeatherDisplay,
  WeatherStats,
  ForecastList,
  ErrorDisplay,
  LoadingSpinner,
  EmptyState,
} from '@/components/Weather';
import logoImg from '@/assets/logo.webp';

function App() {
  const {
    weather,
    loading,
    error,
    searchLocation,
    searchByCoords,
    clearError,
  } = useWeather();

  const {
    latitude,
    longitude,
    loading: geoLoading,
    requestLocation,
    isSupported: geoSupported,
  } = useGeolocation();

  // busca pelo tempo quando pega a localizacao do user
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      searchByCoords(latitude, longitude);
    }
  }, [latitude, longitude, searchByCoords]);

  // muda o fundo baseado na temperatura
  const getBackgroundClass = () => {
    if (!weather?.current) {
      return 'from-slate-700 via-slate-800 to-slate-900';
    }

    const temp = weather.current.temp_c;
    const isDay = weather.current.is_day === 1;

    if (temp > 30) {
      return 'from-orange-500 via-red-500 to-pink-600';
    } else if (temp > 25) {
      return 'from-amber-400 via-orange-500 to-red-500';
    } else if (temp > 15) {
      return isDay
        ? 'from-sky-400 via-blue-500 to-indigo-600'
        : 'from-indigo-600 via-purple-700 to-slate-800';
    } else if (temp > 5) {
      return 'from-blue-400 via-blue-600 to-indigo-700';
    } else {
      return 'from-blue-200 via-blue-400 to-slate-600';
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getBackgroundClass()} 
                  flex flex-col items-center justify-start p-4 sm:p-8
                  transition-all duration-700 ease-in-out`}
    >
      {/* header com logo */}
      <header className="w-full max-w-2xl flex flex-col items-center gap-6 mb-8">
        <img
          src={logoImg}
          alt="Tempo Weather App"
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-lg"
        />
        <SearchBar
          onSearch={searchLocation}
          onLocationRequest={requestLocation}
          isLoading={loading}
          isGeolocationSupported={geoSupported}
          isGeolocationLoading={geoLoading}
        />
      </header>

      {/* conteudo principal */}
      <main className="w-full max-w-2xl flex flex-col items-center gap-8">
        {/* mostra erro se tiver */}
        {error && <ErrorDisplay error={error} onDismiss={clearError} />}

        {/* loading */}
        {loading && <LoadingSpinner />}

        {/* estado inicial sem dados */}
        {!loading && !weather && !error && <EmptyState />}

        {/* dados do tempo */}
        {!loading && weather && (
          <div className="flex flex-col items-center gap-8 animate-fade-in">
            <CurrentWeatherDisplay
              location={weather.location}
              current={weather.current}
            />

            <WeatherStats current={weather.current} />

            {weather.forecast?.forecastday && (
              <ForecastList forecast={weather.forecast.forecastday} />
            )}
          </div>
        )}
      </main>

      {/* footer */}
      <footer className="mt-auto pt-8 text-center">
        <p className="text-white/40 text-xs">
          Dados fornecidos por WeatherAPI.com
        </p>
      </footer>
    </div>
  );
}

export default App;
