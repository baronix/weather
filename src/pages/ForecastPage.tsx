import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiDroplet, FiWind } from 'react-icons/fi';
import { useWeatherStore } from '@/store';
import { useThemeColors } from '@/hooks';
import { Card } from '@/components/UI';
import { formatTemperature, formatWindSpeed, getWeatherIcon, getMoonPhase, isToday } from '@/utils';
import logoImg from '@/assets/logo.webp';

export function ForecastPage() {
  const navigate = useNavigate();
  const { weather, unit, language } = useWeatherStore();
  const { isLight, text, textMuted, textSubtle } = useThemeColors();
  
  const logoClass = isLight ? 'w-12 h-12 object-contain' : 'w-12 h-12 object-contain brightness-0 invert';

  if (!weather?.forecast?.forecastday) {
    return (
      <div className="p-4 max-w-lg mx-auto">
        <button onClick={() => navigate('/')} className={`flex items-center gap-2 ${textMuted} hover:${text} mb-4`}>
          <FiChevronLeft /> {language === 'pt' ? 'Voltar' : 'Back'}
        </button>
        <p className={`${textMuted} text-center py-10`}>
          {language === 'pt' ? 'Nenhum dado disponível. Procure uma cidade primeiro.' : 'No data available. Search for a city first.'}
        </p>
      </div>
    );
  }

  const borderColor = isLight ? 'border-slate-300/30' : 'border-white/10';

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* header */}
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/')} className={`p-2 ${textMuted} hover:${text}`}>
          <FiChevronLeft className="text-2xl" />
        </button>
        <img src={logoImg} alt="Tempo" className={logoClass} />
        <div>
          <h1 className={`text-xl font-bold ${text}`}>
            {language === 'pt' ? 'Previsão 7 dias' : '7-Day Forecast'}
          </h1>
          <p className={`${textMuted} text-sm`}>{weather.location.name}, {weather.location.country}</p>
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
                  <p className={`${text} font-semibold`}>
                    {isToday(day.date) 
                      ? (language === 'pt' ? 'Hoje' : 'Today')
                      : new Date(day.date).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-US', { weekday: 'long', day: 'numeric', month: 'short' })
                    }
                  </p>
                  <p className={`${textMuted} text-sm`}>{day.day.condition.text}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`${text} font-bold text-xl`}>{formatTemperature(day.day.maxtemp_c, unit)}</p>
                <p className={textSubtle}>{formatTemperature(day.day.mintemp_c, unit)}</p>
              </div>
            </div>
            
            {/* detalhes */}
            <div className={`grid grid-cols-4 gap-2 pt-3 border-t ${borderColor}`}>
              <div className="text-center">
                <FiDroplet className={`${isLight ? 'text-blue-500' : 'text-blue-300'} mx-auto mb-1`} />
                <p className={`${textSubtle} text-xs`}>{language === 'pt' ? 'Chuva' : 'Rain'}</p>
                <p className={`${text} text-sm`}>{day.day.daily_chance_of_rain}%</p>
              </div>
              <div className="text-center">
                <FiWind className={`${isLight ? 'text-cyan-600' : 'text-cyan-300'} mx-auto mb-1`} />
                <p className={`${textSubtle} text-xs`}>{language === 'pt' ? 'Vento' : 'Wind'}</p>
                <p className={`${text} text-sm`}>{formatWindSpeed(day.day.maxwind_kph, unit)}</p>
              </div>
              <div className="text-center">
                <span className="text-lg">☀️</span>
                <p className={`${textSubtle} text-xs`}>UV</p>
                <p className={`${text} text-sm`}>{day.day.uv}</p>
              </div>
              <div className="text-center">
                <span className="text-lg">💧</span>
                <p className={`${textSubtle} text-xs`}>{language === 'pt' ? 'Humidade' : 'Humidity'}</p>
                <p className={`${text} text-sm`}>{day.day.avghumidity}%</p>
              </div>
            </div>
            
            {/* astro info */}
            <div className={`flex justify-between mt-3 pt-3 border-t ${borderColor} text-xs`}>
              <div className="flex gap-4">
                <span className={textSubtle}>🌅 {day.astro.sunrise}</span>
                <span className={textSubtle}>🌇 {day.astro.sunset}</span>
              </div>
              <span className={textSubtle}>🌙 {getMoonPhase(day.astro.moon_phase, language)}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
