
import React from 'react';
import SearchIcon from './icons/SearchIcon';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="bg-brand-surface/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-brand-primary/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
          智囊团 AI Game Strategist
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="搜索游戏或攻略..."
            onChange={(e) => onSearch(e.target.value)}
            className="bg-brand-bg border-2 border-brand-surface focus:border-brand-primary rounded-full py-2 pl-10 pr-4 w-48 md:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-secondary">
            <SearchIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
