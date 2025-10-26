
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-1">
      <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
};

export default LoadingSpinner;
