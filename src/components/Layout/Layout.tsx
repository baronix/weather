import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { useWeatherStore } from '@/store';
import { getBackgroundGradient } from '@/utils';

export function Layout() {
  const weather = useWeatherStore((s) => s.weather);
  
  const temp = weather?.current?.temp_c ?? null;
  const isDay = weather?.current?.is_day === 1;
  const gradient = getBackgroundGradient(temp, isDay);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} transition-all duration-1000`}>
      <main className="pb-20 min-h-screen">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
