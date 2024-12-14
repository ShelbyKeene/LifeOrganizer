import React from 'react';

export const Moon3D: React.FC = () => {
  return (
    <div className="fixed top-8 right-8 w-[400px] h-[400px] pointer-events-none">
      {/* Crescent moon container */}
      <div className="absolute inset-0">
        {/* Base moon shape */}
        <div className="absolute inset-0">
          {/* Outer glow layers */}
          <div className="absolute -inset-[25%] rounded-full bg-indigo-100/20 blur-3xl animate-glow-slow" />
          <div className="absolute -inset-[15%] rounded-full bg-white/10 blur-2xl animate-glow-medium" />
          <div className="absolute -inset-[5%] rounded-full bg-white/5 blur-xl animate-glow-fast" />
          
          {/* Main crescent shape */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden">
            {/* Light texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40" />
            
            {/* Craters visible on the lit part */}
            <div className="absolute top-[15%] right-[20%] w-12 h-12 rounded-full bg-gray-200/80 shadow-inner" />
            <div className="absolute top-[45%] right-[15%] w-16 h-16 rounded-full bg-gray-200/80 shadow-inner" />
            <div className="absolute bottom-[25%] right-[25%] w-10 h-10 rounded-full bg-gray-200/80 shadow-inner" />
            
            {/* Shadow overlay creating crescent shape */}
            <div className="absolute -left-[60%] inset-y-0 w-full bg-indigo-950/95 rounded-full shadow-[inset_-10px_0_20px_rgba(0,0,0,0.2)]" />
          </div>
        </div>
      </div>
    </div>
  );
};