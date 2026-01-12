interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div 
      className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 ${className} ${onClick ? 'cursor-pointer hover:bg-white/20 transition-all' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
