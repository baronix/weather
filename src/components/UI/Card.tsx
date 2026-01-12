import { useThemeColors } from '@/hooks';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  const { bgCard, border, bgCardHover } = useThemeColors();
  
  return (
    <div 
      className={`${bgCard} backdrop-blur-md rounded-2xl ${border} border ${className} ${onClick ? `cursor-pointer ${bgCardHover} transition-all` : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
