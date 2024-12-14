import React from 'react';

interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-lg font-light transition-all duration-300
        ${active 
          ? 'bg-white/20 text-white shadow-lg' 
          : 'text-white/70 hover:bg-white/10'
        }
      `}
    >
      {children}
    </button>
  );
};