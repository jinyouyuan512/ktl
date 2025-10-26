
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import LoadingSpinner from './LoadingSpinner';

interface SummaryCardProps {
  summary: string;
  isLoading: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ summary, isLoading }) => {
  return (
    <div className="my-8 p-6 bg-brand-surface border-l-4 border-brand-secondary rounded-r-lg shadow-lg shadow-brand-secondary/10">
      <div className="flex items-center mb-3">
        <SparklesIcon className="text-brand-secondary mr-3" />
        <h3 className="text-xl font-bold">AI 摘要</h3>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-24">
            <LoadingSpinner />
        </div>
      ) : (
        <p className="text-brand-text-secondary whitespace-pre-wrap">{summary}</p>
      )}
    </div>
  );
};

export default SummaryCard;
