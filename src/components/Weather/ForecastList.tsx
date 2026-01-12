import type { ForecastDay } from '@/types';

interface ForecastCardProps {
  forecastDay: ForecastDay;
  isToday?: boolean;
}

function ForecastCard({ forecastDay, isToday }: ForecastCardProps) {
  const date = new Date(forecastDay.date);
  const dayName = isToday
    ? 'Hoje'
    : date.toLocaleDateString('pt-BR', { weekday: 'short' });

  const iconUrl = `https://cdn.weatherapi.com/weather/64x64/${
    forecastDay.day.condition.icon.includes('night') ? 'night' : 'day'
  }/${forecastDay.day.condition.icon.split('/').pop()}`;

  return (
    <div className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[100px] transition-all hover:bg-white/30">
      <p className="text-white/80 text-sm font-medium capitalize">{dayName}</p>
      <img
        src={iconUrl}
        alt={forecastDay.day.condition.text}
        className="w-12 h-12"
        loading="lazy"
      />
      <div className="flex gap-2 text-sm">
        <span className="text-white font-semibold">
          {Math.round(forecastDay.day.maxtemp_c)}°
        </span>
        <span className="text-white/60">
          {Math.round(forecastDay.day.mintemp_c)}°
        </span>
      </div>
    </div>
  );
}

interface ForecastListProps {
  forecast: ForecastDay[];
}

export function ForecastList({ forecast }: ForecastListProps) {
  return (
    <div className="w-full max-w-lg">
      <h3 className="text-white/80 text-sm font-medium mb-3 uppercase tracking-wide">
        Previsão para 5 dias
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {forecast.map((day, index) => (
          <ForecastCard
            key={day.date}
            forecastDay={day}
            isToday={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
