import { useState, useEffect } from 'react';
import { FiSearch, FiMapPin, FiRefreshCw, FiHeart, FiDroplet, FiWind, FiSun, FiAlertTriangle } from 'react-icons/fi';
import { WiBarometer, WiHumidity } from 'react-icons/wi';
import { useWeather, useThemeColors } from '@/hooks';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useWeatherStore } from '@/store';
import { Card, LoadingScreen, ErrorMessage } from '@/components/UI';
import { formatTemperature, formatWindSpeed, getWeatherIcon, getAqiDescription } from '@/utils';
import logoImg from '@/assets/logo.webp';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { weather, loading, error, searchLocation, searchByCoords, refresh } = useWeather();
  const { latitude, longitude, loading: geoLoading, requestLocation, isSupported } = useGeolocation();
  const { unit, language, favorites, addFavorite, removeFavorite, isFavorite } = useWeatherStore();
  const { isLight, text, textMuted, textSubtle, bgInput, bgButton, bgButtonHover, border, borderFocus, placeholder } = useThemeColors();

  // pesquisa automática quando obtém geolocalização
  useEffect(() => {
    if (latitude && longitude) {
      searchByCoords(latitude, longitude);
    }
  }, [latitude, longitude, searchByCoords]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchLocation(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const toggleFavorite = () => {
    if (!weather) return;
    
    const { name, country, lat, lon } = weather.location;
    if (isFavorite(name)) {
      const fav = favorites.find(f => f.name.toLowerCase() === name.toLowerCase());
      if (fav) removeFavorite(fav.id);
    } else {
      addFavorite({
        id: `${lat}-${lon}`,
        name,
        country,
        lat,
        lon,
      });
    }
  };

  const currentIsFavorite = weather ? isFavorite(weather.location.name) : false;
  
  // classe do logo muda conforme o tema
  const logoClass = isLight ? 'w-20 h-20 object-contain' : 'w-20 h-20 object-contain brightness-0 invert';

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* header */}
      <header className="flex flex-col items-center gap-4 pt-4 pb-6">
        <img src={logoImg} alt="Tempo" className={logoClass} />
        
        {/* barra de busca */}
        <div className="flex gap-2 w-full">
          <div className="relative flex-1">
            <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${textSubtle}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === 'pt' ? 'Pesquisar cidade...' : 'Search city...'}
              className={`w-full pl-11 pr-4 py-3 ${bgInput} backdrop-blur-md rounded-xl ${text} ${placeholder} border ${border} focus:outline-none ${borderFocus} transition-all`}
            />
          </div>
          
          {isSupported && (
            <button
              onClick={requestLocation}
              disabled={geoLoading}
              className={`p-3 ${bgButton} backdrop-blur-md rounded-xl border ${border} ${text} ${bgButtonHover} transition-all disabled:opacity-50`}
              title={language === 'pt' ? 'Usar minha localização' : 'Use my location'}
            >
              {geoLoading ? (
                <div className={`w-5 h-5 border-2 ${isLight ? 'border-slate-400 border-t-slate-800' : 'border-white/50 border-t-white'} rounded-full animate-spin`} />
              ) : (
                <FiMapPin className="text-xl" />
              )}
            </button>
          )}
          
          {weather && (
            <button
              onClick={refresh}
              disabled={loading}
              className={`p-3 ${bgButton} backdrop-blur-md rounded-xl border ${border} ${text} ${bgButtonHover} transition-all disabled:opacity-50`}
              title={language === 'pt' ? 'Atualizar' : 'Refresh'}
            >
              <FiRefreshCw className={`text-xl ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </header>

      {/* loading */}
      {loading && !weather && <LoadingScreen />}

      {/* erro */}
      {error && <ErrorMessage message={error} onRetry={refresh} />}

      {/* conteudo principal */}
      {weather && !loading && (
        <div className="space-y-4 animate-fade-in">
          {/* localizacao e favorito */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${text}`}>{weather.location.name}</h1>
              <p className={`${textMuted} text-sm`}>{weather.location.region}, {weather.location.country}</p>
            </div>
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full transition-all ${currentIsFavorite ? 'text-red-400 bg-red-400/20' : `${textSubtle} hover:text-red-400`}`}
            >
              <FiHeart className={`text-2xl ${currentIsFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* temperatura principal */}
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center gap-4">
              <img
                src={getWeatherIcon(weather.current.condition.icon, weather.current.is_day)}
                alt={weather.current.condition.text}
                className="w-24 h-24"
              />
              <div>
                <p className={`text-6xl font-bold ${text}`}>
                  {formatTemperature(weather.current.temp_c, unit)}
                </p>
                <p className={`${textMuted} text-lg`}>{weather.current.condition.text}</p>
              </div>
            </div>
            <p className={`${textSubtle} text-sm mt-2`}>
              {language === 'pt' ? 'Sensação' : 'Feels like'} {formatTemperature(weather.current.feelslike_c, unit)}
            </p>
          </Card>

          {/* alertas */}
          {weather.alerts?.alert && weather.alerts.alert.length > 0 && (
            <Card className={`p-4 ${isLight ? 'bg-orange-100 border-orange-300' : 'bg-orange-500/20 border-orange-400/30'}`}>
              <div className="flex items-start gap-3">
                <FiAlertTriangle className={`${isLight ? 'text-orange-600' : 'text-orange-400'} text-xl flex-shrink-0 mt-1`} />
                <div>
                  <p className={`${isLight ? 'text-orange-800' : 'text-orange-200'} font-medium`}>{weather.alerts.alert[0].headline}</p>
                  <p className={`${isLight ? 'text-orange-700' : 'text-orange-200/70'} text-sm mt-1`}>{weather.alerts.alert[0].desc?.slice(0, 150)}...</p>
                </div>
              </div>
            </Card>
          )}

          {/* stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <WiHumidity className={`text-3xl ${isLight ? 'text-blue-500' : 'text-blue-300'}`} />
                <div>
                  <p className={`${textMuted} text-xs uppercase`}>{language === 'pt' ? 'Humidade' : 'Humidity'}</p>
                  <p className={`${text} font-semibold text-lg`}>{weather.current.humidity}%</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <FiWind className={`text-2xl ${isLight ? 'text-cyan-600' : 'text-cyan-300'}`} />
                <div>
                  <p className={`${textMuted} text-xs uppercase`}>{language === 'pt' ? 'Vento' : 'Wind'}</p>
                  <p className={`${text} font-semibold text-lg`}>{formatWindSpeed(weather.current.wind_kph, unit)}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <WiBarometer className={`text-3xl ${isLight ? 'text-purple-600' : 'text-purple-300'}`} />
                <div>
                  <p className={`${textMuted} text-xs uppercase`}>{language === 'pt' ? 'Pressão' : 'Pressure'}</p>
                  <p className={`${text} font-semibold text-lg`}>{weather.current.pressure_mb} mb</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <FiSun className={`text-2xl ${isLight ? 'text-yellow-600' : 'text-yellow-300'}`} />
                <div>
                  <p className={`${textMuted} text-xs uppercase`}>UV</p>
                  <p className={`${text} font-semibold text-lg`}>{weather.current.uv}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* qualidade do ar */}
          {weather.current.air_quality && (
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiDroplet className={`text-2xl ${isLight ? 'text-green-600' : 'text-green-300'}`} />
                  <div>
                    <p className={`${textMuted} text-xs uppercase`}>{language === 'pt' ? 'Qualidade do ar' : 'Air quality'}</p>
                    <p className={`font-semibold text-lg ${getAqiDescription(weather.current.air_quality['us-epa-index'], language).color}`}>
                      {getAqiDescription(weather.current.air_quality['us-epa-index'], language).text}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`${textSubtle} text-xs`}>PM2.5</p>
                  <p className={`${text} font-medium`}>{Math.round(weather.current.air_quality.pm2_5)} µg/m³</p>
                </div>
              </div>
            </Card>
          )}

          {/* preview da previsao */}
          {weather.forecast?.forecastday && (
            <Card className="p-4">
              <p className={`${textMuted} text-xs uppercase mb-3`}>{language === 'pt' ? 'Próximos dias' : 'Next days'}</p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {weather.forecast.forecastday.slice(0, 5).map((day, i) => (
                  <div key={day.date} className={`flex flex-col items-center min-w-[70px] p-2 rounded-xl ${isLight ? 'bg-slate-800/5' : 'bg-white/5'}`}>
                    <p className={`${textMuted} text-xs`}>
                      {i === 0 ? (language === 'pt' ? 'Hoje' : 'Today') : new Date(day.date).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-US', { weekday: 'short' })}
                    </p>
                    <img
                      src={getWeatherIcon(day.day.condition.icon, 1)}
                      alt={day.day.condition.text}
                      className="w-10 h-10"
                    />
                    <p className={`${text} font-medium text-sm`}>{formatTemperature(day.day.maxtemp_c, unit)}</p>
                    <p className={`${textSubtle} text-xs`}>{formatTemperature(day.day.mintemp_c, unit)}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* sol e lua */}
          {weather.forecast?.forecastday[0]?.astro && (
            <Card className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`${textMuted} text-xs uppercase mb-2`}>{language === 'pt' ? 'Nascer do sol' : 'Sunrise'}</p>
                  <p className={`${text} font-medium`}>{weather.forecast.forecastday[0].astro.sunrise}</p>
                  <p className={`${textMuted} text-xs uppercase mt-3 mb-2`}>{language === 'pt' ? 'Pôr do sol' : 'Sunset'}</p>
                  <p className={`${text} font-medium`}>{weather.forecast.forecastday[0].astro.sunset}</p>
                </div>
                <div>
                  <p className={`${textMuted} text-xs uppercase mb-2`}>{language === 'pt' ? 'Fase da lua' : 'Moon phase'}</p>
                  <p className={`${text} font-medium`}>{weather.forecast.forecastday[0].astro.moon_phase}</p>
                  <p className={`${textMuted} text-xs uppercase mt-3 mb-2`}>{language === 'pt' ? 'Iluminação' : 'Illumination'}</p>
                  <p className={`${text} font-medium`}>{weather.forecast.forecastday[0].astro.moon_illumination}%</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* estado inicial */}
      {!weather && !loading && !error && (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="text-6xl mb-4">🌤️</div>
          <h2 className={`text-xl font-semibold ${text} mb-2`}>
            {language === 'pt' ? 'Bem-vindo ao Tempo' : 'Welcome to Tempo'}
          </h2>
          <p className={`${textMuted} max-w-xs`}>
            {language === 'pt' 
              ? 'Pesquise uma cidade ou use a sua localização para ver a previsão do tempo'
              : 'Search for a city or use your location to see the weather forecast'
            }
          </p>
        </div>
      )}
    </div>
  );
}
