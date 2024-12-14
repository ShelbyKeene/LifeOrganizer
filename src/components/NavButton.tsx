import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavButtonProps {
  Icon: LucideIcon;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export const NavButton: React.FC<NavButtonProps> = ({ Icon, label, onClick, isActive = false }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full p-4 rounded-xl
        transition-all duration-300 ease-in-out
        ${isActive 
          ? 'bg-white/20 text-white shadow-lg translate-x-2' 
          : 'text-white/70 hover:bg-white/10 hover:translate-x-1'}
      `}
    >
      <Icon className="w-5 h-5" />
      <span className="text-lg font-light">{label}</span>
    </button>
  );
};