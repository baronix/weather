import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiTrash2, FiMapPin } from 'react-icons/fi';
import { useWeatherStore } from '@/store';
import { useWeather, useThemeColors } from '@/hooks';
import { Card } from '@/components/UI';
import logoImg from '@/assets/logo.webp';

export function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, removeFavorite, language } = useWeatherStore();
  const { searchLocation } = useWeather();
  const { isLight, text, textMuted, textSubtle, bgButton } = useThemeColors();
  
  const logoClass = isLight ? 'w-12 h-12 object-contain' : 'w-12 h-12 object-contain brightness-0 invert';

  const handleSelect = (name: string) => {
    searchLocation(name);
    navigate('/');
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* header */}
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/')} className={`p-2 ${textMuted} hover:${text}`}>
          <FiChevronLeft className="text-2xl" />
        </button>
        <img src={logoImg} alt="Tempo" className={logoClass} />
        <div>
          <h1 className={`text-xl font-bold ${text}`}>
            {language === 'pt' ? 'Locais favoritos' : 'Favorite Locations'}
          </h1>
          <p className={`${textMuted} text-sm`}>
            {favorites.length} {language === 'pt' ? 'guardado(s)' : 'saved'}
          </p>
        </div>
      </header>

      {/* lista de favoritos */}
      {favorites.length > 0 ? (
        <div className="space-y-3">
          {favorites.map((fav) => (
            <Card key={fav.id} className="p-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleSelect(fav.name)}
                  className="flex items-center gap-3 flex-1 text-left"
                >
                  <div className={`p-2 ${bgButton} rounded-full`}>
                    <FiMapPin className={text} />
                  </div>
                  <div>
                    <p className={`${text} font-medium`}>{fav.name}</p>
                    <p className={`${textSubtle} text-sm`}>{fav.country}</p>
                  </div>
                </button>
                <button
                  onClick={() => removeFavorite(fav.id)}
                  className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                >
                  <FiTrash2 className="text-lg" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-4">❤️</div>
          <p className={textMuted}>
            {language === 'pt' 
              ? 'Nenhum local favorito ainda. Adicione locais clicando no coração na página inicial.'
              : 'No favorite locations yet. Add locations by clicking the heart on the home page.'
            }
          </p>
        </div>
      )}
    </div>
  );
}
