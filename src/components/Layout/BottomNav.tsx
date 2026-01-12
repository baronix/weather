import { NavLink } from 'react-router-dom';
import { FiHome, FiCalendar, FiClock, FiHeart, FiSettings } from 'react-icons/fi';
import { useWeatherStore } from '@/store';

const navItems = [
  { to: '/', icon: FiHome, label: 'Início' },
  { to: '/forecast', icon: FiCalendar, label: 'Previsão' },
  { to: '/hourly', icon: FiClock, label: 'Horário' },
  { to: '/favorites', icon: FiHeart, label: 'Favoritos' },
  { to: '/settings', icon: FiSettings, label: 'Config.' },
];

interface BottomNavProps {
  isLightTheme?: boolean;
}

export function BottomNav({ isLightTheme = false }: BottomNavProps) {
  const weather = useWeatherStore((s) => s.weather);
  const hasData = !!weather;

  const textColor = isLightTheme ? 'text-slate-800' : 'text-white';
  const textMuted = isLightTheme ? 'text-slate-600' : 'text-white/60';
  const bgActive = isLightTheme ? 'bg-slate-800/10' : 'bg-white/20';
  const bgHover = isLightTheme ? 'hover:bg-slate-800/5' : 'hover:bg-white/10';
  const borderColor = isLightTheme ? 'border-slate-300/50' : 'border-white/20';
  const bgNav = isLightTheme ? 'bg-white/60' : 'bg-white/10';

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 ${bgNav} backdrop-blur-xl border-t ${borderColor}`}>
      <div className="max-w-lg mx-auto px-2">
        <ul className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            // desativa algumas páginas se não houver dados
            const disabled = !hasData && (item.to === '/forecast' || item.to === '/hourly');
            
            return (
              <li key={item.to}>
                <NavLink
                  to={disabled ? '#' : item.to}
                  onClick={(e) => disabled && e.preventDefault()}
                  className={({ isActive }) => `
                    flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all
                    ${disabled 
                      ? 'opacity-30 cursor-not-allowed' 
                      : isActive 
                        ? `${textColor} ${bgActive}` 
                        : `${textMuted} hover:${textColor} ${bgHover}`
                    }
                  `}
                >
                  <item.icon className="text-xl" />
                  <span className="text-xs font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
