import React from 'react';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<HeaderProps> = ({ children, className = '' }) => (
  <h1 className={`font-dancing text-6xl font-bold text-white mb-4 text-shadow-lg ${className}`}>
    {children}
  </h1>
);

export const SubHeader: React.FC<HeaderProps> = ({ children, className = '' }) => (
  <p className={`text-xl font-light tracking-wide text-white/95 leading-relaxed ${className}`}>
    {children}
  </p>
);

export const SectionHeader: React.FC<HeaderProps> = ({ children, className = '' }) => (
  <h2 className={`font-dancing text-4xl font-bold text-white mb-3 text-shadow-lg ${className}`}>
    {children}
  </h2>
);