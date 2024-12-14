import React from 'react';

export const Bees: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bee"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 5}s`
          }}
        >
          <div className="relative">
            <div className="w-2 h-2 bg-yellow-400/70 rounded-full shadow-lg" />
            <div className="absolute -inset-1 bg-white/10 blur-sm animate-buzz" />
          </div>
        </div>
      ))}
    </div>
  );
};