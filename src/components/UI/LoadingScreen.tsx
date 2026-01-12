export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-white/20 rounded-full" />
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-white/70 text-sm">carregando...</p>
    </div>
  );
}
