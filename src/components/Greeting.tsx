import React, { useState, useEffect } from 'react';
import { getGreeting } from '../utils/timeUtils';

interface GreetingProps {
  name: string;
  className?: string;
}

export const Greeting: React.FC<GreetingProps> = ({ name, className = '' }) => {
  const [greeting, setGreeting] = useState(getGreeting(name));

  useEffect(() => {
    // Update greeting when name changes
    setGreeting(getGreeting(name));

    // Update greeting every hour
    const interval = setInterval(() => {
      setGreeting(getGreeting(name));
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [name]);

  return (
    <div className={`transition-all duration-300 ${className}`}>
      {greeting}
    </div>
  );
};