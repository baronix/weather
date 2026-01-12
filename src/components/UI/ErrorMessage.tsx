import { useThemeColors } from '@/hooks';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { isLight } = useThemeColors();
  
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-red-500/20 backdrop-blur-md rounded-2xl border border-red-400/30 max-w-sm mx-auto">
      <p className={`${isLight ? 'text-red-700' : 'text-red-200'} text-center`}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`px-4 py-2 ${isLight ? 'bg-slate-800/10 hover:bg-slate-800/20 text-slate-800' : 'bg-white/20 hover:bg-white/30 text-white'} rounded-xl transition-all`}
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
