import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { useWeatherStore } from '@/store';
import { getBackgroundGradient } from '@/utils';

export function Layout() {
  const weather = useWeatherStore((s) => s.weather);
  const theme = useWeatherStore((s) => s.theme);
  
  const temp = weather?.current?.temp_c ?? null;
  const isDay = weather?.current?.is_day === 1;
  const gradient = getBackgroundGradient(temp, isDay, theme);
  
  // determina se o texto deve ser escuro (para tema claro)
  const isLightTheme = theme === 'light';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} transition-all duration-1000 ${isLightTheme ? 'text-slate-800' : ''}`}>
      <main className="pb-20 min-h-screen">
        <Outlet context={{ isLightTheme }} />
      </main>
      <BottomNav isLightTheme={isLightTheme} />
    </div>
  );
}
