interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-red-500/20 backdrop-blur-md rounded-2xl border border-red-400/30 max-w-sm mx-auto">
      <p className="text-red-200 text-center">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all"
        >
          tentar de novo
        </button>
      )}
    </div>
  );
}
