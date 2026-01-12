import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiTrash2, FiMapPin } from 'react-icons/fi';
import { useWeatherStore } from '@/store';
import { useWeather } from '@/hooks';
import { Card } from '@/components/UI';

export function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, removeFavorite, language } = useWeatherStore();
  const { searchLocation } = useWeather();

  const handleSelect = (name: string) => {
    searchLocation(name);
    navigate('/');
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* header */}
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/')} className="p-2 text-white/70 hover:text-white">
          <FiChevronLeft className="text-2xl" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">
            {language === 'pt' ? 'locais favoritos' : 'favorite locations'}
          </h1>
          <p className="text-white/60 text-sm">
            {favorites.length} {language === 'pt' ? 'salvos' : 'saved'}
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
                  <div className="p-2 bg-white/10 rounded-full">
                    <FiMapPin className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{fav.name}</p>
                    <p className="text-white/50 text-sm">{fav.country}</p>
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
          <p className="text-white/60">
            {language === 'pt' 
              ? 'nenhum local favorito ainda. adicione locais clicando no coracao na pagina inicial.'
              : 'no favorite locations yet. add locations by clicking the heart on the home page.'
            }
          </p>
        </div>
      )}
    </div>
  );
}
