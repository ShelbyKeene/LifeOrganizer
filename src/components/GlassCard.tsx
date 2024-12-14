import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`backdrop-blur-md bg-white/30 rounded-2xl shadow-lg border border-white/20 p-4 ${className}`}>
      {children}
    </div>
  );
};