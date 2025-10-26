
import React, { useState, useEffect } from 'react';
import { Guide } from '../types';
import { generateSummary } from '../services/geminiService';
import SummaryCard from '../components/SummaryCard';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';

interface GuidePageProps {
  guide: Guide;
  onBack: () => void;
}

const GuidePage: React.FC<GuidePageProps> = ({ guide, onBack }) => {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      const result = await generateSummary(guide.content);
      setSummary(result);
      setIsLoading(false);
    };

    fetchSummary();
  }, [guide.content]);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
        <button onClick={onBack} className="flex items-center space-x-2 text-brand-primary mb-6 hover:underline">
            <ArrowLeftIcon />
            <span>返回攻略列表</span>
        </button>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">{guide.title}</h1>
      
      <SummaryCard summary={summary} isLoading={isLoading} />

      <article className="prose prose-invert prose-lg max-w-none prose-h1:text-brand-primary prose-h2:border-b prose-h2:border-brand-primary/20 prose-h2:pb-2 prose-a:text-brand-primary hover:prose-a:text-brand-secondary prose-strong:text-brand-text prose-blockquote:border-l-brand-secondary prose-code:text-brand-primary prose-code:bg-brand-bg prose-code:p-1 prose-code:rounded">
        {guide.content.split('\n').map((line, index) => {
          if (line.startsWith('# ')) return <h1 key={index} className="!text-3xl mt-8 mb-4">{line.substring(2)}</h1>;
          if (line.startsWith('## ')) return <h2 key={index} className="!text-2xl mt-6 mb-3">{line.substring(3)}</h2>;
          if (line.startsWith('### ')) return <h3 key={index} className="!text-xl mt-4 mb-2">{line.substring(4)}</h3>;
          if (line.trim().startsWith('|')) {
             // This is a simplistic table parser for markdown
            const rows = guide.content.split('\n').filter(l => l.trim().startsWith('|'));
            const header = rows[0].split('|').slice(1, -1).map(h => h.trim());
            const body = rows.slice(2).map(r => r.split('|').slice(1, -1).map(c => c.trim()));
            if(index !== rows.findIndex(l => l === line)) return null;
            return (
                <div key={index} className="overflow-x-auto my-6">
                    <table className="min-w-full divide-y divide-brand-surface">
                        <thead className="bg-brand-bg">
                            <tr>{header.map((h, i) => <th key={i} className="px-6 py-3 text-left text-xs font-medium text-brand-text-secondary uppercase tracking-wider">{h}</th>)}</tr>
                        </thead>
                        <tbody className="bg-brand-surface divide-y divide-brand-bg">
                            {body.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} className="px-6 py-4 whitespace-nowrap text-sm">{cell}</td>)}</tr>)}
                        </tbody>
                    </table>
                </div>
            )
          }
          return <p key={index}>{line}</p>;
        })}
      </article>
    </div>
  );
};

export default GuidePage;
