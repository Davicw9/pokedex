import React, { useState, useEffect, useMemo } from 'react';
import { Heart } from 'lucide-react';
import SearchBar from './components/SearchBar';
import PokemonCard, { type Pokemon } from './components/PokemonCard';
import PokemonDetails from './components/PokemonDetails';

interface BasePokemon {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [allPokemonBase, setAllPokemonBase] = useState<BasePokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([]);

  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('pokemonFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e: React.MouseEvent | null, id: number) => {
    if (e) e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const ITEMS_PER_PAGE = 20;

  const filteredPokemon = useMemo(() => {
    return allPokemonBase.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;
      
      if (showFavoritesOnly) {
        const idMatch = p.url.match(/\/(\d+)\/$/);
        const id = idMatch ? parseInt(idMatch[1]) : 0;
        if (!favorites.includes(id)) return false;
      }
      
      return true;
    });
  }, [allPokemonBase, searchQuery, showFavoritesOnly, favorites]);

  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  // Fetch initial base list (151)
  useEffect(() => {
    const fetchBaseList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        setAllPokemonBase(data.results);
      } catch (error) {
        console.error('Error fetching base pokemon list:', error);
      }
    };
    fetchBaseList();
  }, []);

  // Fetch details for the current page
  useEffect(() => {
    const fetchDetails = async () => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const toDisplay = filteredPokemon.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      
      if (toDisplay.length === 0) {
        setDisplayedPokemon([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const detailPromises = toDisplay.map(async (p) => {
          const res = await fetch(p.url);
          return await res.json() as Pokemon;
        });
        
        const details = await Promise.all(detailPromises);
        setDisplayedPokemon(details);
      } catch (error) {
        console.error('Error fetching pokemon details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [filteredPokemon, currentPage]);

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-800 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5350] to-[#fca5a5] mb-4">
            Pokédex
          </h1>
          <p className="text-slate-500 font-medium">
            Encontre informações sobre os 151 Pokémons originais.
          </p>
        </header>

        {selectedPokemon ? (
          <PokemonDetails 
            pokemon={selectedPokemon} 
            isFavorite={favorites.includes(selectedPokemon.id)}
            onToggleFavorite={toggleFavorite}
            onBack={() => setSelectedPokemon(null)} 
          />
        ) : (
          <div className="animate-fade-in-up">
            <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-10 items-center">
              <div className="flex-1 w-full">
                <SearchBar 
                  value={searchQuery} 
                  onChange={(val) => {
                    setSearchQuery(val);
                    setCurrentPage(1);
                  }} 
                />
              </div>
              <button 
                onClick={() => {
                  setShowFavoritesOnly(!showFavoritesOnly);
                  setCurrentPage(1);
                }}
                className={`w-full sm:w-auto px-6 py-[1.1rem] rounded-2xl flex items-center justify-center gap-3 font-bold transition-all shadow-[0_4px_20px_rgb(0,0,0,0.05)] border-2 ${
                  showFavoritesOnly 
                    ? 'bg-red-50 text-red-500 border-red-200' 
                    : 'bg-white text-slate-500 border-transparent hover:border-slate-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${showFavoritesOnly ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                Favoritos {favorites.length > 0 && `(${favorites.length})`}
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : displayedPokemon.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {displayedPokemon.map((pokemon) => (
                    <PokemonCard 
                      key={pokemon.id} 
                      pokemon={pokemon}
                      isFavorite={favorites.includes(pokemon.id)}
                      onToggleFavorite={toggleFavorite}
                      onClick={setSelectedPokemon} 
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-12 space-x-4">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === 1 
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                          : 'bg-white shadow-sm border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Anterior
                    </button>
                    <span className="text-slate-500 font-medium">
                      Página {currentPage} de {totalPages}
                    </span>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === totalPages 
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                          : 'bg-white shadow-sm border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Próximo
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 text-slate-400">
                <p className="text-lg font-medium">Nenhum Pokémon encontrado. =(</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
