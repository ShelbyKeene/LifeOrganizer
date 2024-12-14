import React from 'react';

interface CloudsProps {
  darkMode?: boolean;
}

export const Clouds: React.FC<CloudsProps> = ({ darkMode = false }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Large cloud layers */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`
            absolute rounded-full blur-3xl animate-float
            ${darkMode ? 'bg-slate-600' : 'bg-white'}
          `}
          style={{
            width: `${200 + Math.random() * 300}px`,
            height: `${150 + Math.random() * 200}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 40}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${20 + Math.random() * 20}s`,
            transform: `scale(${0.8 + Math.random() * 0.4})`,
            opacity: darkMode ? 0.3 : 0.15 // Reduced opacity for white clouds
          }}
        />
      ))}

      {/* Smaller scattered clouds */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`small-${i}`}
          className={`
            absolute rounded-full blur-2xl animate-float
            ${darkMode ? 'bg-slate-500' : 'bg-white'}
          `}
          style={{
            width: `${100 + Math.random() * 150}px`,
            height: `${80 + Math.random() * 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 15}s`,
            transform: `scale(${0.6 + Math.random() * 0.4})`,
            opacity: darkMode ? 0.2 : 0.1 // Reduced opacity for white clouds
          }}
        />
      ))}
    </div>
  );
};