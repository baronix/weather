import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { useWeatherStore } from '@/store';
import { Card } from '@/components/UI';
import { formatTemperature, getWeatherIcon, formatHour } from '@/utils';

export function HourlyPage() {
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

  // pega as proximas 24 horas
  const now = new Date();
  const allHours = weather.forecast.forecastday.flatMap(day => day.hour);
  const nextHours = allHours.filter(hour => new Date(hour.time) >= now).slice(0, 24);

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* header */}
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/')} className="p-2 text-white/70 hover:text-white">
          <FiChevronLeft className="text-2xl" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">
            {language === 'pt' ? 'previsao horaria' : 'hourly forecast'}
          </h1>
          <p className="text-white/60 text-sm">{weather.location.name}</p>
        </div>
      </header>

      {/* grafico de temperatura simplificado */}
      <Card className="p-4 mb-4 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {nextHours.slice(0, 12).map((hour) => {
            const temp = hour.temp_c;
            const maxTemp = Math.max(...nextHours.slice(0, 12).map(h => h.temp_c));
            const minTemp = Math.min(...nextHours.slice(0, 12).map(h => h.temp_c));
            const range = maxTemp - minTemp || 1;
            const height = ((temp - minTemp) / range) * 60 + 20;
            
            return (
              <div key={hour.time} className="flex flex-col items-center gap-1 min-w-[50px]">
                <p className="text-white text-xs font-medium">{formatTemperature(temp, unit)}</p>
                <div 
                  className="w-2 bg-gradient-to-t from-blue-400 to-orange-400 rounded-full"
                  style={{ height: `${height}px` }}
                />
                <p className="text-white/50 text-xs">{formatHour(hour.time)}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* lista detalhada */}
      <div className="space-y-2">
        {nextHours.map((hour) => (
          <Card key={hour.time} className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="text-white/70 w-14 text-sm">{formatHour(hour.time)}</p>
                <img
                  src={getWeatherIcon(hour.condition.icon, hour.is_day)}
                  alt={hour.condition.text}
                  className="w-10 h-10"
                />
                <p className="text-white/70 text-sm hidden sm:block">{hour.condition.text}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-white/50 text-xs">💧</p>
                  <p className="text-white text-sm">{hour.chance_of_rain}%</p>
                </div>
                <div className="text-center">
                  <p className="text-white/50 text-xs">💨</p>
                  <p className="text-white text-sm">{Math.round(hour.wind_kph)}</p>
                </div>
                <p className="text-white font-semibold text-lg w-16 text-right">
                  {formatTemperature(hour.temp_c, unit)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
