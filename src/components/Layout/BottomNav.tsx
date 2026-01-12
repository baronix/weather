import { NavLink } from 'react-router-dom';
import { FiHome, FiCalendar, FiClock, FiHeart, FiSettings } from 'react-icons/fi';
import { useWeatherStore } from '@/store';

const navItems = [
  { to: '/', icon: FiHome, label: 'Inicio' },
  { to: '/forecast', icon: FiCalendar, label: 'Previsao' },
  { to: '/hourly', icon: FiClock, label: 'Horario' },
  { to: '/favorites', icon: FiHeart, label: 'Favoritos' },
  { to: '/settings', icon: FiSettings, label: 'Config' },
];

export function BottomNav() {
  const weather = useWeatherStore((s) => s.weather);
  const hasData = !!weather;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-t border-white/20">
      <div className="max-w-lg mx-auto px-2">
        <ul className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            // desabilita algumas paginas se nao tiver dados
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
                        ? 'text-white bg-white/20' 
                        : 'text-white/60 hover:text-white hover:bg-white/10'
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
