import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiSun, FiMoon, FiMonitor, FiGlobe, FiRefreshCw } from 'react-icons/fi';
import { useWeatherStore, type TemperatureUnit, type Theme, type Language } from '@/store';
import { Card } from '@/components/UI';

export function SettingsPage() {
  const navigate = useNavigate();
  const {
    unit,
    theme,
    language,
    autoRefresh,
    refreshInterval,
    setUnit,
    setTheme,
    setLanguage,
    setAutoRefresh,
    setRefreshInterval,
  } = useWeatherStore();

  const units: { value: TemperatureUnit; label: { pt: string; en: string } }[] = [
    { value: 'celsius', label: { pt: 'Celsius (°C)', en: 'Celsius (°C)' } },
    { value: 'fahrenheit', label: { pt: 'Fahrenheit (°F)', en: 'Fahrenheit (°F)' } },
  ];

  const themes: { value: Theme; label: { pt: string; en: string }; icon: typeof FiSun }[] = [
    { value: 'light', label: { pt: 'Claro', en: 'Light' }, icon: FiSun },
    { value: 'dark', label: { pt: 'Escuro', en: 'Dark' }, icon: FiMoon },
    { value: 'auto', label: { pt: 'Automatico', en: 'Auto' }, icon: FiMonitor },
  ];

  const languages: { value: Language; label: string }[] = [
    { value: 'pt', label: 'Portugues' },
    { value: 'en', label: 'English' },
  ];

  const intervals = [5, 15, 30, 60];

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* header */}
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/')} className="p-2 text-white/70 hover:text-white">
          <FiChevronLeft className="text-2xl" />
        </button>
        <h1 className="text-xl font-bold text-white">
          {language === 'pt' ? 'configuracoes' : 'settings'}
        </h1>
      </header>

      <div className="space-y-6">
        {/* unidade de temperatura */}
        <Card className="p-4">
          <h2 className="text-white font-medium mb-3 flex items-center gap-2">
            🌡️ {language === 'pt' ? 'unidade de temperatura' : 'temperature unit'}
          </h2>
          <div className="flex gap-2">
            {units.map((u) => (
              <button
                key={u.value}
                onClick={() => setUnit(u.value)}
                className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                  unit === u.value
                    ? 'bg-white/30 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {u.label[language]}
              </button>
            ))}
          </div>
        </Card>

        {/* tema */}
        <Card className="p-4">
          <h2 className="text-white font-medium mb-3 flex items-center gap-2">
            🎨 {language === 'pt' ? 'tema' : 'theme'}
          </h2>
          <div className="flex gap-2">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`flex-1 py-2 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  theme === t.value
                    ? 'bg-white/30 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                <t.icon />
                <span className="hidden sm:inline">{t.label[language]}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* idioma */}
        <Card className="p-4">
          <h2 className="text-white font-medium mb-3 flex items-center gap-2">
            <FiGlobe /> {language === 'pt' ? 'idioma' : 'language'}
          </h2>
          <div className="flex gap-2">
            {languages.map((l) => (
              <button
                key={l.value}
                onClick={() => setLanguage(l.value)}
                className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                  language === l.value
                    ? 'bg-white/30 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </Card>

        {/* auto refresh */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-medium flex items-center gap-2">
              <FiRefreshCw /> {language === 'pt' ? 'atualizar automaticamente' : 'auto refresh'}
            </h2>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`w-12 h-6 rounded-full transition-all ${
                autoRefresh ? 'bg-green-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-all transform ${
                  autoRefresh ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          
          {autoRefresh && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-white/60 text-sm mb-2">
                {language === 'pt' ? 'intervalo (minutos)' : 'interval (minutes)'}
              </p>
              <div className="flex gap-2">
                {intervals.map((i) => (
                  <button
                    key={i}
                    onClick={() => setRefreshInterval(i)}
                    className={`flex-1 py-2 rounded-xl transition-all ${
                      refreshInterval === i
                        ? 'bg-white/30 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* sobre */}
        <Card className="p-4">
          <h2 className="text-white font-medium mb-2">
            {language === 'pt' ? 'sobre' : 'about'}
          </h2>
          <p className="text-white/60 text-sm">
            Tempo v1.0.0
          </p>
          <p className="text-white/40 text-xs mt-1">
            {language === 'pt' ? 'dados por' : 'data by'} WeatherAPI.com
          </p>
        </Card>
      </div>
    </div>
  );
}
