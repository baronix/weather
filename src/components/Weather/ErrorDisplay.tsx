import { FiAlertCircle } from 'react-icons/fi';
import type { WeatherError } from '@/types';

interface ErrorDisplayProps {
  error: WeatherError;
  onDismiss: () => void;
}

export function ErrorDisplay({ error, onDismiss }: ErrorDisplayProps) {
  return (
    <div 
      className="flex items-center gap-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 
                 rounded-xl p-4 max-w-md animate-fade-in"
      role="alert"
    >
      <FiAlertCircle className="text-red-300 text-xl flex-shrink-0" />
      <p className="text-red-100 text-sm flex-1">{error.message}</p>
      <button
        onClick={onDismiss}
        className="text-red-300 hover:text-white text-sm font-medium transition-colors"
        aria-label="fechar erro"
      >
        Fechar
      </button>
    </div>
  );
}
