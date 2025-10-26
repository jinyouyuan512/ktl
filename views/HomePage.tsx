
import React from 'react';
import { Game } from '../types';
import GameCard from '../components/GameCard';

interface HomePageProps {
  games: Game[];
  onSelectGame: (gameId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ games, onSelectGame }) => {
  return (
    <div className="animate-fade-in">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">欢迎来到 AI 游戏智囊团</h2>
            <p className="text-brand-text-secondary">在这里，AI 助你攻克每一个难关。</p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} onSelectGame={onSelectGame} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
