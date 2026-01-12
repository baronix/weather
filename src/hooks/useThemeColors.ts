import { useWeatherStore } from '@/store';

export function useThemeColors() {
  const theme = useWeatherStore((s) => s.theme);
  const isLight = theme === 'light';

  return {
    isLight,
    // textos
    text: isLight ? 'text-slate-800' : 'text-white',
    textMuted: isLight ? 'text-slate-600' : 'text-white/60',
    textSubtle: isLight ? 'text-slate-500' : 'text-white/50',
    textVerySubtle: isLight ? 'text-slate-400' : 'text-white/40',
    // fundos
    bgCard: isLight ? 'bg-white/40' : 'bg-white/10',
    bgCardHover: isLight ? 'hover:bg-white/60' : 'hover:bg-white/20',
    bgInput: isLight ? 'bg-white/50' : 'bg-white/10',
    bgButton: isLight ? 'bg-slate-800/10' : 'bg-white/10',
    bgButtonHover: isLight ? 'hover:bg-slate-800/20' : 'hover:bg-white/20',
    // bordas
    border: isLight ? 'border-slate-300/50' : 'border-white/20',
    borderFocus: isLight ? 'focus:border-slate-400' : 'focus:border-white/40',
    // placeholder
    placeholder: isLight ? 'placeholder-slate-500' : 'placeholder-white/50',
  };
}
