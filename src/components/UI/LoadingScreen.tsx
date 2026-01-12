import { useThemeColors } from '@/hooks';

export function LoadingScreen() {
  const { isLight, textMuted } = useThemeColors();
  
  const borderBase = isLight ? 'border-slate-400/20' : 'border-white/20';
  const borderActive = isLight ? 'border-slate-600 border-t-transparent' : 'border-white border-t-transparent';
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative">
        <div className={`w-20 h-20 border-4 ${borderBase} rounded-full`} />
        <div className={`absolute top-0 left-0 w-20 h-20 border-4 ${borderActive} rounded-full animate-spin`} />
      </div>
      <p className={`${textMuted} text-sm`}>Carregando...</p>
    </div>
  );
}
