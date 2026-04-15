import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto mb-10 group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-4 py-4 rounded-2xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.05)] border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400 text-lg"
        placeholder="Procure por um Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
