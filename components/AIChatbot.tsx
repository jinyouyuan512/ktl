
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import CloseIcon from './icons/CloseIcon';
import SparklesIcon from './icons/SparklesIcon';
import LoadingSpinner from './LoadingSpinner';

interface AIChatbotProps {
  context: { guideTitle: string; guideContent: string } | null;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        setMessages([{
            id: Date.now(),
            sender: 'ai',
            text: context 
                ? `你好！我已经载入了《${context.guideTitle}》的攻略。关于这篇攻略，有什么可以帮你的吗？`
                : '你好！我是你的AI游戏助手。有什么问题都可以问我！'
        }]);
    } else {
        setMessages([]);
    }
  }, [isOpen, context]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
    };
    
    const loadingMessage: ChatMessage = {
      id: Date.now() + 1,
      sender: 'ai',
      text: '',
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInput('');

    const aiResponseText = await getChatResponse([...messages, userMessage], context);

    const aiMessage: ChatMessage = {
      id: Date.now() + 1,
      sender: 'ai',
      text: aiResponseText,
    };

    setMessages(prev => [...prev.slice(0, -1), aiMessage]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-brand-primary to-brand-secondary text-white w-16 h-16 rounded-full shadow-lg shadow-brand-primary/30 flex items-center justify-center transform hover:scale-110 transition-transform duration-300 z-50"
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <CloseIcon /> : <ChatBubbleIcon />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-brand-surface rounded-2xl shadow-2xl shadow-brand-secondary/20 flex flex-col z-50 overflow-hidden border border-brand-primary/20 transition-opacity duration-300 animate-fade-in-up">
          <div className="p-4 bg-brand-bg/50 border-b border-brand-primary/20 flex items-center space-x-2">
            <SparklesIcon className="text-brand-primary" />
            <h3 className="font-bold text-lg">AI 问答中心</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex flex-col space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-primary text-brand-bg rounded-br-none' : 'bg-brand-bg text-brand-text rounded-bl-none'}`}>
                    {msg.isLoading ? <LoadingSpinner /> : <p className="text-sm">{msg.text}</p>}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t border-brand-primary/20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="问一个具体的问题..."
              className="w-full bg-brand-bg border-2 border-brand-surface focus:border-brand-primary rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-colors"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
