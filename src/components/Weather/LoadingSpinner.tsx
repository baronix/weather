export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 rounded-full" />
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-white/70 text-sm">Carregando dados...</p>
    </div>
  );
}
