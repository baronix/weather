import { WiDaySunny } from 'react-icons/wi';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 text-center max-w-sm">
      <WiDaySunny className="text-8xl text-white/40" />
      <div>
        <h2 className="text-white text-xl font-semibold mb-2">
          Bem-vindo ao Tempo
        </h2>
        <p className="text-white/60 text-sm leading-relaxed">
          Pesquise por uma cidade ou país para ver a previsão do tempo atual.
          Para locais internacionais, pesquise em inglês.
        </p>
      </div>
    </div>
  );
}
