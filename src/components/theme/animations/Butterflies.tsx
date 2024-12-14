import React from 'react';

export const Butterflies: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-butterfly"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        >
          <div className="relative">
            <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm transform-gpu animate-wing-left" />
            <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm transform-gpu animate-wing-right" />
          </div>
        </div>
      ))}
    </div>
  );
};