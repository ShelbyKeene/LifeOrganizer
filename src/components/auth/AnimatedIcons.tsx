import React from 'react';

export const AnimatedIcons: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Primary gradient orb with pulsing animation */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-400/40 via-purple-400/30 to-transparent animate-pulse-slow transform-gpu" />

      {/* Secondary pulsing layers */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-400/30 via-purple-400/20 to-transparent animate-pulse-medium transform-gpu" />
      <div className="absolute inset-0 bg-gradient-radial from-violet-400/25 via-blue-400/15 to-transparent animate-pulse-fast transform-gpu" />

      {/* Moving gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-800/40 to-indigo-800/40 animate-gradient transform-gpu" />
    </div>
  );
};