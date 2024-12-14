import React from 'react';

interface StarsProps {
  count?: number;
}

export const Stars: React.FC<StarsProps> = ({ count = 50 }) => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        const animationDelay = Math.random() * 3;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: `${animationDelay}s`,
            }}
          />
        );
      })}
    </div>
  );
};