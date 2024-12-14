import React from 'react';

export const Grass: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Extended grass coverage */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-green-600/40 to-transparent" />
      
      {/* Middle layer grass */}
      <div className="absolute bottom-0 left-0 right-0 h-64">
        {[...Array(150)].map((_, i) => (
          <div
            key={`mid-${i}`}
            className="absolute bottom-0 w-6 bg-gradient-to-t from-green-600/50 to-green-500/30 rounded-t-full animate-gentle-sway"
            style={{
              height: `${80 + Math.random() * 80}px`,
              left: `${(i / 150) * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              zIndex: Math.floor(Math.random() * 10)
            }}
          />
        ))}
      </div>

      {/* Foreground grass */}
      <div className="absolute bottom-0 left-0 right-0 h-48">
        {[...Array(100)].map((_, i) => (
          <div
            key={`front-${i}`}
            className="absolute bottom-0 w-4 bg-gradient-to-t from-green-700/60 to-green-600/40 rounded-t-full animate-gentle-sway"
            style={{
              height: `${60 + Math.random() * 60}px`,
              left: `${(i / 100) * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              zIndex: 20
            }}
          />
        ))}
      </div>

      {/* Base gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-700/50 via-green-600/40 to-transparent" />
    </div>
  );
};