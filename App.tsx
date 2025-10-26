
import React, { useState, useMemo } from 'react';
import { Game, Guide } from './types';
import { games, guides as allGuides } from './data/mockData';
import Header from './components/Header';
import HomePage from './views/HomePage';
import GamePage from './views/GamePage';
import GuidePage from './views/GuidePage';
import AIChatbot from './components/AIChatbot';

type View = 'home' | 'game' | 'guide';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectGame = (gameId: string) => {
    setSelectedGameId(gameId);
    setCurrentView('game');
  };

  const handleSelectGuide = (guideId: string) => {
    setSelectedGuideId(guideId);
    setCurrentView('guide');
  };

  const handleBack = () => {
    if (currentView === 'guide') {
      setCurrentView('game');
      setSelectedGuideId(null);
    } else if (currentView === 'game') {
      setCurrentView('home');
      setSelectedGameId(null);
    }
  };

  const selectedGame = useMemo(() => games.find(g => g.id === selectedGameId), [selectedGameId]);
  const guidesForGame = useMemo(() => allGuides.filter(g => g.gameId === selectedGameId), [selectedGameId]);
  const selectedGuide = useMemo(() => allGuides.find(g => g.id === selectedGuideId), [selectedGuideId]);

  const filteredGames = useMemo(() => {
    if (!searchQuery) return games;
    return games.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredGuides = useMemo(() => {
    if (!searchQuery || !selectedGameId) return guidesForGame;
    return guidesForGame.filter(guide =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, guidesForGame, selectedGameId]);

  const renderContent = () => {
    switch (currentView) {
      case 'guide':
        return selectedGuide && <GuidePage guide={selectedGuide} onBack={handleBack} />;
      case 'game':
        return selectedGame && <GamePage game={selectedGame} guides={filteredGuides} onSelectGuide={handleSelectGuide} onBack={handleBack} />;
      case 'home':
      default:
        return <HomePage games={filteredGames} onSelectGame={handleSelectGame} />;
    }
  };
  
  const chatbotContext = selectedGuide ? {
    guideTitle: selectedGuide.title,
    guideContent: selectedGuide.content,
  } : null;

  return (
    <div className="min-h-screen bg-brand-bg font-sans">
      <Header onSearch={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <AIChatbot context={chatbotContext} />
    </div>
  );
};

export default App;
