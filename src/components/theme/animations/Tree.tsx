import React from 'react';

export const Tree: React.FC = () => {
  return (
    <div className="fixed right-0 bottom-0 w-[600px] h-[800px] pointer-events-none overflow-hidden">
      <div className="absolute bottom-0 right-0 w-full h-full">
        {/* Tree trunk */}
        <div className="absolute bottom-0 right-48 w-16 h-[500px] bg-gradient-to-br from-[#4a3728] to-[#2a1f18] rounded-t-full transform-gpu animate-gentle-sway" />
        
        {/* Tree branches with leaves */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 bg-gradient-to-br from-[#68945c] to-[#3c6428] rounded-full blur-sm transform-gpu animate-leaf-sway"
            style={{
              right: `${150 + Math.sin(i) * 100}px`,
              bottom: `${300 + i * 80}px`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};