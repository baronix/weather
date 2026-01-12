import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiSun, FiMoon, FiMonitor, FiGlobe, FiRefreshCw } from 'react-icons/fi';
import { useWeatherStore, type TemperatureUnit, type Theme, type Language } from '@/store';
import { useThemeColors } from '@/hooks';
import { Card } from '@/components/UI';
import logoImg from '@/assets/logo.webp';

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
  const { isLight, text, textMuted, textVerySubtle } = useThemeColors();
  
  const logoClass = isLight ? 'w-12 h-12 object-contain' : 'w-12 h-12 object-contain brightness-0 invert';

  const units: { value: TemperatureUnit; label: { pt: string; en: string } }[] = [
    { value: 'celsius', label: { pt: 'Celsius (°C)', en: 'Celsius (°C)' } },
    { value: 'fahrenheit', label: { pt: 'Fahrenheit (°F)', en: 'Fahrenheit (°F)' } },
  ];

  const themes: { value: Theme; label: { pt: string; en: string }; icon: typeof FiSun }[] = [
    { value: 'light', label: { pt: 'Claro', en: 'Light' }, icon: FiSun },
    { value: 'dark', label: { pt: 'Escuro', en: 'Dark' }, icon: FiMoon },
    { value: 'auto', label: { pt: 'Automático', en: 'Auto' }, icon: FiMonitor },
  ];

  const languages: { value: Language; label: string }[] = [
    { value: 'pt', label: 'Português' },
    { value: 'en', label: 'English' },
  ];

  const intervals = [5, 15, 30, 60];
  
  // estilos dos botões conforme o tema
  const btnActive = isLight ? 'bg-slate-800/20 text-slate-800' : 'bg-white/30 text-white';
  const btnInactive = isLight ? 'bg-slate-800/5 text-slate-600 hover:bg-slate-800/10' : 'bg-white/5 text-white/60 hover:bg-white/10';
  const borderColor = isLight ? 'border-slate-300/30' : 'border-white/10';
  const toggleBg = isLight ? 'bg-slate-300' : 'bg-white/20';

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* header */}
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/')} className={`p-2 ${textMuted} hover:${text}`}>
          <FiChevronLeft className="text-2xl" />
        </button>
        <img src={logoImg} alt="Tempo" className={logoClass} />
        <h1 className={`text-xl font-bold ${text}`}>
          {language === 'pt' ? 'Definições' : 'Settings'}
        </h1>
      </header>

      <div className="space-y-6">
        {/* unidade de temperatura */}
        <Card className="p-4">
          <h2 className={`${text} font-medium mb-3 flex items-center gap-2`}>
            🌡️ {language === 'pt' ? 'Unidade de temperatura' : 'Temperature Unit'}
          </h2>
          <div className="flex gap-2">
            {units.map((u) => (
              <button
                key={u.value}
                onClick={() => setUnit(u.value)}
                className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                  unit === u.value ? btnActive : btnInactive
                }`}
              >
                {u.label[language]}
              </button>
            ))}
          </div>
        </Card>

        {/* tema */}
        <Card className="p-4">
          <h2 className={`${text} font-medium mb-3 flex items-center gap-2`}>
            🎨 {language === 'pt' ? 'Tema' : 'Theme'}
          </h2>
          <div className="flex gap-2">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`flex-1 py-2 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  theme === t.value ? btnActive : btnInactive
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
          <h2 className={`${text} font-medium mb-3 flex items-center gap-2`}>
            <FiGlobe /> {language === 'pt' ? 'Idioma' : 'Language'}
          </h2>
          <div className="flex gap-2">
            {languages.map((l) => (
              <button
                key={l.value}
                onClick={() => setLanguage(l.value)}
                className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                  language === l.value ? btnActive : btnInactive
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
            <h2 className={`${text} font-medium flex items-center gap-2`}>
              <FiRefreshCw /> {language === 'pt' ? 'Atualizar automaticamente' : 'Auto Refresh'}
            </h2>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`w-12 h-6 rounded-full transition-all ${
                autoRefresh ? 'bg-green-500' : toggleBg
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-all transform shadow ${
                  autoRefresh ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          
          {autoRefresh && (
            <div className={`mt-3 pt-3 border-t ${borderColor}`}>
              <p className={`${textMuted} text-sm mb-2`}>
                {language === 'pt' ? 'Intervalo (minutos)' : 'Interval (minutes)'}
              </p>
              <div className="flex gap-2">
                {intervals.map((i) => (
                  <button
                    key={i}
                    onClick={() => setRefreshInterval(i)}
                    className={`flex-1 py-2 rounded-xl transition-all ${
                      refreshInterval === i ? btnActive : btnInactive
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
          <h2 className={`${text} font-medium mb-2`}>
            {language === 'pt' ? 'Sobre' : 'About'}
          </h2>
          <p className={`${textMuted} text-sm`}>
            Tempo v1.0.0
          </p>
          <p className={`${textVerySubtle} text-xs mt-1`}>
            {language === 'pt' ? 'Dados por' : 'Data by'} WeatherAPI.com
          </p>
        </Card>
      </div>
    </div>
  );
}
