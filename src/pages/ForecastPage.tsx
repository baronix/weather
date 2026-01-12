import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiDroplet, FiWind } from 'react-icons/fi';
import { useWeatherStore } from '@/store';
import { Card } from '@/components/UI';
import { formatTemperature, formatWindSpeed, getWeatherIcon, getMoonPhase, isToday } from '@/utils';

export function ForecastPage() {
  const navigate = useNavigate();
  const { weather, unit, language } = useWeatherStore();

  if (!weather?.forecast?.forecastday) {
    return (
      <div className="p-4 max-w-lg mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/70 hover:text-white mb-4">
          <FiChevronLeft /> {language === 'pt' ? 'voltar' : 'back'}
        </button>
        <p className="text-white/60 text-center py-10">
          {language === 'pt' ? 'nenhum dado disponivel. busque uma cidade primeiro.' : 'no data available. search for a city first.'}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* header */}
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/')} className="p-2 text-white/70 hover:text-white">
          <FiChevronLeft className="text-2xl" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">
            {language === 'pt' ? 'previsao de 7 dias' : '7-day forecast'}
          </h1>
          <p className="text-white/60 text-sm">{weather.location.name}, {weather.location.country}</p>
        </div>
      </header>

      {/* lista de dias */}
      <div className="space-y-3">
        {weather.forecast.forecastday.map((day) => (
          <Card key={day.date} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={getWeatherIcon(day.day.condition.icon, 1)}
                  alt={day.day.condition.text}
                  className="w-14 h-14"
                />
                <div>
                  <p className="text-white font-semibold">
                    {isToday(day.date) 
                      ? (language === 'pt' ? 'hoje' : 'today')
                      : new Date(day.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'short' })
                    }
                  </p>
                  <p className="text-white/60 text-sm">{day.day.condition.text}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-xl">{formatTemperature(day.day.maxtemp_c, unit)}</p>
                <p className="text-white/50">{formatTemperature(day.day.mintemp_c, unit)}</p>
              </div>
            </div>
            
            {/* detalhes */}
            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/10">
              <div className="text-center">
                <FiDroplet className="text-blue-300 mx-auto mb-1" />
                <p className="text-white/50 text-xs">{language === 'pt' ? 'chuva' : 'rain'}</p>
                <p className="text-white text-sm">{day.day.daily_chance_of_rain}%</p>
              </div>
              <div className="text-center">
                <FiWind className="text-cyan-300 mx-auto mb-1" />
                <p className="text-white/50 text-xs">{language === 'pt' ? 'vento' : 'wind'}</p>
                <p className="text-white text-sm">{formatWindSpeed(day.day.maxwind_kph, unit)}</p>
              </div>
              <div className="text-center">
                <span className="text-yellow-300 text-lg">☀️</span>
                <p className="text-white/50 text-xs">UV</p>
                <p className="text-white text-sm">{day.day.uv}</p>
              </div>
              <div className="text-center">
                <span className="text-blue-200 text-lg">💧</span>
                <p className="text-white/50 text-xs">{language === 'pt' ? 'humidade' : 'humidity'}</p>
                <p className="text-white text-sm">{day.day.avghumidity}%</p>
              </div>
            </div>
            
            {/* astro info */}
            <div className="flex justify-between mt-3 pt-3 border-t border-white/10 text-xs">
              <div className="flex gap-4">
                <span className="text-white/50">🌅 {day.astro.sunrise}</span>
                <span className="text-white/50">🌇 {day.astro.sunset}</span>
              </div>
              <span className="text-white/50">🌙 {getMoonPhase(day.astro.moon_phase, language)}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
