
import React from 'react';
import { Guide } from '../types';

interface GuideCardProps {
  guide: Guide;
  onSelectGuide: (guideId: string) => void;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide, onSelectGuide }) => {
  return (
    <div
      onClick={() => onSelectGuide(guide.id)}
      className="bg-brand-surface p-4 rounded-lg shadow-md hover:shadow-brand-secondary/20 hover:bg-brand-bg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
    >
      <h4 className="text-lg font-semibold text-brand-primary">{guide.title}</h4>
    </div>
  );
};

export default GuideCard;
