import type { WeatherLocation, CurrentWeather } from '@/types';

interface CurrentWeatherDisplayProps {
  location: WeatherLocation;
  current: CurrentWeather;
}

export function CurrentWeatherDisplay({ location, current }: CurrentWeatherDisplayProps) {
  const isHot = current.temp_c > 25;
  const iconPath = current.is_day ? 'day' : 'night';
  const iconCode = current.condition.icon.split('/').pop();
  const iconUrl = `https://cdn.weatherapi.com/weather/128x128/${iconPath}/${iconCode}`;

  const formattedTime = new Date(location.localtime).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDate = new Date(location.localtime).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="flex flex-col items-center text-center">
      {/* localizacao */}
      <div className="mb-2">
        <h1 className="text-white text-3xl font-bold tracking-tight">
          {location.name}
        </h1>
        <p className="text-white/70 text-sm">
          {location.region}, {location.country}
        </p>
      </div>

      {/* data e hora */}
      <p className="text-white/60 text-sm capitalize mb-6">
        {formattedDate} • {formattedTime}
      </p>

      {/* temperatura */}
      <div className="relative flex items-center justify-center mb-4">
        <img
          src={iconUrl}
          alt={current.condition.text}
          className="w-32 h-32 animate-pulse"
        />
        <div
          className={`text-8xl font-bold ${
            isHot
              ? 'bg-gradient-to-br from-orange-300 via-red-400 to-pink-500'
              : 'bg-gradient-to-br from-blue-200 via-blue-400 to-indigo-500'
          } bg-clip-text text-transparent`}
        >
          {Math.round(current.temp_c)}°
        </div>
      </div>

      {/* condicao */}
      <p className="text-white text-xl font-medium mb-2">
        {current.condition.text}
      </p>

      {/* sensacao termica */}
      <p className="text-white/60 text-sm">
        Sensação térmica de {Math.round(current.feelslike_c)}°C
      </p>
    </div>
  );
}
