import React from 'react';

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

export const typeColors: Record<string, string> = {
  normal: 'bg-gray-400 text-white',
  fire: 'bg-red-500 text-white',
  water: 'bg-blue-500 text-white',
  electric: 'bg-yellow-400 text-gray-900',
  grass: 'bg-green-500 text-white',
  ice: 'bg-cyan-300 text-gray-900',
  fighting: 'bg-orange-600 text-white',
  poison: 'bg-purple-500 text-white',
  ground: 'bg-yellow-600 text-white',
  flying: 'bg-indigo-300 text-gray-900',
  psychic: 'bg-pink-500 text-white',
  bug: 'bg-lime-500 text-gray-900',
  rock: 'bg-yellow-700 text-white',
  ghost: 'bg-purple-700 text-white',
  dragon: 'bg-indigo-600 text-white',
  dark: 'bg-gray-800 text-white',
  steel: 'bg-gray-500 text-white',
  fairy: 'bg-pink-300 text-gray-900',
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default;
  const mainType = pokemon.types[0]?.type.name || 'normal';

  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;
  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div 
      onClick={() => onClick(pokemon)}
      className="relative group rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 ease-in-out hover:-translate-y-2 cursor-pointer flex flex-col items-center p-6 h-full border-b-[6px] hover:border-b-8 animate-fade-in-up"
      style={{ borderBottomColor: `var(--type-${mainType}, #CBD5E1)` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent z-0 pointer-events-none" />

      <span className="absolute top-4 right-4 text-sm font-black text-slate-300 z-10 group-hover:text-slate-400 transition-colors">
        {formattedId}
      </span>

      <div className="w-32 h-32 mb-4 relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300 ease-out">
        {imageUrl ? (
          <img src={imageUrl} alt={pokemon.name} className="w-full h-full object-contain" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
        )}
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-3 z-10">{capitalizedName}</h2>

      <div className="flex gap-2 z-10 mt-auto">
        {pokemon.types.map((t, idx) => (
          <span 
            key={idx} 
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-sm ${typeColors[t.type.name] || 'bg-slate-200 text-slate-700'}`}
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
