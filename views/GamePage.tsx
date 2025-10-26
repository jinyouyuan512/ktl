
import React from 'react';
import { Game, Guide } from '../types';
import GuideCard from '../components/GuideCard';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';

interface GamePageProps {
  game: Game;
  guides: Guide[];
  onSelectGuide: (guideId: string) => void;
  onBack: () => void;
}

const GamePage: React.FC<GamePageProps> = ({ game, guides, onSelectGuide, onBack }) => {
  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="flex items-center space-x-2 text-brand-primary mb-6 hover:underline">
        <ArrowLeftIcon />
        <span>返回游戏列表</span>
      </button>
      <div className="mb-8 flex flex-col md:flex-row items-start gap-8">
        <img src={game.coverImage} alt={game.title} className="w-full md:w-1/4 max-w-[250px] rounded-lg shadow-lg shadow-brand-primary/10"/>
        <div>
            <h2 className="text-4xl font-bold mb-2">{game.title}</h2>
            <p className="text-brand-text-secondary">{game.description}</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4 border-l-4 border-brand-primary pl-4">攻略列表</h3>
      <div className="space-y-4">
        {guides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} onSelectGuide={onSelectGuide} />
        ))}
      </div>
    </div>
  );
};

export default GamePage;
