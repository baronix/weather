import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { useWeatherStore } from '@/store';
import { useThemeColors } from '@/hooks';
import { Card } from '@/components/UI';
import { formatTemperature, getWeatherIcon, formatHour } from '@/utils';
import logoImg from '@/assets/logo.webp';

export function HourlyPage() {
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

  // obtém as próximas 24 horas
  const now = new Date();
  const allHours = weather.forecast.forecastday.flatMap(day => day.hour);
  const nextHours = allHours.filter(hour => new Date(hour.time) >= now).slice(0, 24);
  
  // calcula min/max para o gráfico
  const graphHours = nextHours.slice(0, 12);
  const temps = graphHours.map(h => h.temp_c);
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const range = maxTemp - minTemp || 1;

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
            {language === 'pt' ? 'Previsão horária' : 'Hourly Forecast'}
          </h1>
          <p className={`${textMuted} text-sm`}>{weather.location.name}</p>
        </div>
      </header>

      {/* grafico de temperatura com linha e pontos */}
      <Card className="p-4 mb-4 overflow-x-auto">
        <p className={`${textMuted} text-xs uppercase mb-3`}>{language === 'pt' ? 'Próximas 12 horas' : 'Next 12 hours'}</p>
        <div className="relative">
          {/* Container do grafico */}
          <div className="flex items-end justify-between gap-2 min-w-max h-32 px-2">
            {graphHours.map((hour) => {
              const temp = hour.temp_c;
              // posição Y normalizada (0-100)
              const yPos = ((temp - minTemp) / range) * 100;
              // altura do ponto desde baixo
              const bottomOffset = 20 + (yPos * 0.7); // 20px mínimo, 90px máximo
              
              return (
                <div key={hour.time} className="flex flex-col items-center relative min-w-[55px]">
                  {/* Temperatura acima do ponto */}
                  <div 
                    className="absolute flex flex-col items-center"
                    style={{ bottom: `${bottomOffset + 15}px` }}
                  >
                    <span className={`${text} text-xs font-semibold`}>
                      {formatTemperature(temp, unit)}
                    </span>
                  </div>
                  
                  {/* Ponto do grafico */}
                  <div 
                    className={`absolute w-3 h-3 rounded-full ${
                      isLight 
                        ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
                        : 'bg-white shadow-lg shadow-white/50'
                    }`}
                    style={{ bottom: `${bottomOffset}px` }}
                  />
                  
                  {/* Linha vertical ate o ponto */}
                  <div 
                    className={`absolute w-0.5 ${isLight ? 'bg-blue-400/30' : 'bg-white/20'} rounded-full`}
                    style={{ 
                      bottom: '20px',
                      height: `${bottomOffset - 20}px`
                    }}
                  />
                  
                  {/* Icone do tempo */}
                  <div className="absolute bottom-0">
                    <img
                      src={getWeatherIcon(hour.condition.icon, hour.is_day)}
                      alt=""
                      className="w-6 h-6"
                    />
                  </div>
                  
                  {/* Hora abaixo */}
                  <div className="absolute -bottom-5">
                    <span className={`${textSubtle} text-[10px]`}>{formatHour(hour.time)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Espaco para a hora */}
        <div className="h-6" />
      </Card>

      {/* lista detalhada */}
      <div className="space-y-2">
        {nextHours.map((hour) => (
          <Card key={hour.time} className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className={`${textMuted} w-14 text-sm`}>{formatHour(hour.time)}</p>
                <img
                  src={getWeatherIcon(hour.condition.icon, hour.is_day)}
                  alt={hour.condition.text}
                  className="w-10 h-10"
                />
                <p className={`${textMuted} text-sm hidden sm:block`}>{hour.condition.text}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className={`${textSubtle} text-xs`}>💧</p>
                  <p className={`${text} text-sm`}>{hour.chance_of_rain}%</p>
                </div>
                <div className="text-center">
                  <p className={`${textSubtle} text-xs`}>💨</p>
                  <p className={`${text} text-sm`}>{Math.round(hour.wind_kph)}</p>
                </div>
                <p className={`${text} font-semibold text-lg w-16 text-right`}>
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
