import { WiHumidity, WiStrongWind, WiThermometer, WiBarometer } from 'react-icons/wi';
import type { CurrentWeather as CurrentWeatherType } from '@/types';

interface WeatherStatsProps {
  current: CurrentWeatherType;
}

export function WeatherStats({ current }: WeatherStatsProps) {
  const stats = [
    {
      icon: WiThermometer,
      label: 'Sensação',
      value: `${Math.round(current.feelslike_c)}°`,
    },
    {
      icon: WiHumidity,
      label: 'Humidade',
      value: `${current.humidity}%`,
    },
    {
      icon: WiStrongWind,
      label: 'Vento',
      value: `${Math.round(current.wind_kph)} km/h`,
    },
    {
      icon: WiBarometer,
      label: 'Pressão',
      value: `${current.pressure_mb} mb`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all hover:bg-white/30"
        >
          <stat.icon className="text-3xl text-white/80" />
          <div>
            <p className="text-white/70 text-xs uppercase tracking-wide">{stat.label}</p>
            <p className="text-white font-semibold text-lg">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
