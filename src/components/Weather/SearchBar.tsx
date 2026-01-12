import { useState, useCallback, type KeyboardEvent, type ChangeEvent } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (location: string) => void;
  onLocationRequest: () => void;
  isLoading: boolean;
  isGeolocationSupported: boolean;
  isGeolocationLoading: boolean;
}

export function SearchBar({
  onSearch,
  onLocationRequest,
  isLoading,
  isGeolocationSupported,
  isGeolocationLoading,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(() => {
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
      setQuery('');
    }
  }, [query, isLoading, onSearch]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  return (
    <div className="flex gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Pesquisar cidade ou país..."
          disabled={isLoading}
          aria-label="pesquisar cidade ou pais"
          className="w-full pl-11 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl 
                     text-gray-800 placeholder-gray-400 
                     border-2 border-transparent
                     focus:outline-none focus:border-white/50 focus:bg-white
                     transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-lg"
        />
      </div>

      {isGeolocationSupported && (
        <button
          onClick={onLocationRequest}
          disabled={isLoading || isGeolocationLoading}
          aria-label="usar minha localizacao"
          title="Usar minha localização"
          className="p-3 bg-white/90 backdrop-blur-sm rounded-xl
                     text-gray-600 hover:text-blue-600 hover:bg-white
                     border-2 border-transparent
                     focus:outline-none focus:border-white/50
                     transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-lg"
        >
          {isGeolocationLoading ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <FiMapPin className="text-xl" />
          )}
        </button>
      )}
    </div>
  );
}
