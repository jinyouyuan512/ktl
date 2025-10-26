
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onSelectGame: (gameId: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelectGame }) => {
  return (
    <div
      onClick={() => onSelectGame(game.id)}
      className="bg-brand-surface rounded-lg overflow-hidden shadow-lg hover:shadow-brand-primary/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
    >
      <img src={game.coverImage} alt={game.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold group-hover:text-brand-primary transition-colors">{game.title}</h3>
        <p className="text-sm text-brand-text-secondary mt-1">{game.description}</p>
      </div>
    </div>
  );
};

export default GameCard;
