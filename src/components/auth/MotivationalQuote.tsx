import React, { useState, useEffect } from 'react';

const quotes = [
  {
    text: "The secret of getting ahead is getting started",
    author: "Mark Twain"
  },
  {
    text: "Small progress is still progress",
    author: "Anonymous"
  },
  {
    text: "The only way to do great work is to love what you do",
    author: "Steve Jobs"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going",
    author: "Sam Levenson"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts",
    author: "Winston Churchill"
  }
];

export const MotivationalQuote: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuote(prev => {
          const currentIndex = quotes.findIndex(q => q.text === prev.text);
          const nextIndex = (currentIndex + 1) % quotes.length;
          return quotes[nextIndex];
        });
        setIsTransitioning(false);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mb-12">
      {/* Fixed height container to prevent layout shifts */}
      <div className="h-24 relative">
        <div className={`
          absolute inset-0 flex flex-col items-center justify-center
          transition-all duration-1000 ease-in-out
          ${isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'}
        `}>
          <p className="text-xl text-white/90 font-light leading-relaxed px-4">
            {currentQuote.text}
          </p>
          <p className="text-white/50 font-light mt-2">
            — {currentQuote.author}
          </p>
        </div>
      </div>
    </div>
  );
};