import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { type Pokemon, typeColors } from './PokemonCard';

interface PokemonDetailsProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent | null, id: number) => void;
  onBack: () => void;
}

const formatStatName = (name: string) => {
  switch (name) {
    case 'hp': return 'HP';
    case 'attack': return 'Attack';
    case 'defense': return 'Defense';
    case 'special-attack': return 'Sp. Atk';
    case 'special-defense': return 'Sp. Def';
    case 'speed': return 'Speed';
    default: return name.charAt(0).toUpperCase() + name.slice(1);
  }
};

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon, isFavorite, onToggleFavorite, onBack }) => {
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default;
  const mainType = pokemon.types[0]?.type.name || 'normal';
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;
  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  // Convert weight (hectograms) to kg, height (decimetres) to meters
  const weightKg = (pokemon.weight / 10).toFixed(1);
  const heightM = (pokemon.height / 10).toFixed(1);

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-slate-500 hover:text-primary transition-colors font-medium group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Voltar para a Lista
      </button>

      <div className="relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl p-8 md:p-12 border-b-[8px]"
           style={{ borderBottomColor: `var(--type-${mainType}, #CBD5E1)` }}>
        
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          
          {/* Left Column (Image & Types) */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-black text-slate-300">{formattedId}</span>
              <button 
                onClick={(e) => onToggleFavorite(e, pokemon.id)}
                className="p-2 rounded-full hover:bg-white/40 transition-colors"
                title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Heart className={`w-8 h-8 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-300 hover:text-red-400'}`} />
              </button>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 text-center">{capitalizedName}</h2>
            
            <div className="w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl animate-fade-in">
              {imageUrl && (
                <img src={imageUrl} alt={pokemon.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
              )}
            </div>

            <div className="flex gap-3 mt-8">
              {pokemon.types.map((t, idx) => (
                <span 
                  key={idx} 
                  className={`px-6 py-2 rounded-full text-sm font-bold capitalize shadow-md ${typeColors[t.type.name] || 'bg-slate-200 text-slate-700'}`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column (Info & Stats) */}
          <div className="flex-1 w-full bg-white/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/40 shadow-inner">
            
            <div className="grid grid-cols-2 gap-6 mb-8 text-center bg-white/60 rounded-xl p-4 shadow-sm border border-white/60">
              <div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Peso</p>
                <p className="text-xl font-extrabold text-slate-700">{weightKg} kg</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Altura</p>
                <p className="text-xl font-extrabold text-slate-700">{heightM} m</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((a, idx) => (
                  <span key={idx} className="bg-slate-100/80 text-slate-700 px-4 py-1.5 rounded-lg text-sm font-semibold capitalize border border-slate-200 shadow-sm">
                    {a.ability.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Status Base</h3>
              <div className="space-y-4">
                {pokemon.stats.map((s, idx) => {
                  const percentage = Math.min((s.base_stat / 255) * 100, 100);
                  const isLow = s.base_stat < 50;
                  const isHigh = s.base_stat >= 100;
                  const barColor = isHigh ? 'bg-green-500' : isLow ? 'bg-red-400' : 'bg-primary';

                  return (
                    <div key={idx}>
                      <div className="flex justify-between text-sm font-bold mb-1">
                        <span className="text-slate-500 uppercase tracking-wide">{formatStatName(s.stat.name)}</span>
                        <span className="text-slate-700">{s.base_stat}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                        <div 
                          className={`h-2.5 rounded-full ${barColor} shadow-sm transition-all duration-1000 ease-out`} 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
