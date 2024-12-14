import React from 'react';
import { Sun, Cloud, Moon } from 'lucide-react';
import { TimeOfDay } from '../types';

interface TimeIconProps {
  timeOfDay: TimeOfDay;
}

export const TimeIcon: React.FC<TimeIconProps> = ({ timeOfDay }) => {
  const iconConfigs = {
    morning: {
      Icon: Sun,
      wrapperClass: "animate-pulse text-amber-500",
      glowClass: "from-amber-500/40 via-amber-500/10 to-transparent",
      iconSize: "w-16 h-16"
    },
    afternoon: {
      Icon: Sun,
      wrapperClass: "animate-pulse text-blue-500",
      glowClass: "from-blue-500/40 via-blue-500/10 to-transparent",
      iconSize: "w-16 h-16"
    },
    evening: {
      Icon: Moon,
      wrapperClass: "text-indigo-200",
      glowClass: "from-indigo-200/40 via-indigo-200/10 to-transparent",
      iconSize: "w-16 h-16"
    }
  };

  const { Icon, wrapperClass, glowClass, iconSize } = iconConfigs[timeOfDay];

  const renderAfternoonComposition = () => (
    <div className="relative">
      <Sun className="w-16 h-16 text-yellow-400 animate-pulse" />
    </div>
  );

  const renderMorningComposition = () => (
    <div className="relative">
      <Cloud className="w-12 h-12 text-gray-300/70 absolute -top-2 right-8" />
      <Sun className="w-16 h-16 text-amber-500 relative z-10 animate-pulse" />
    </div>
  );

  return (
    <div className="fixed top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
      {/* Large background glow */}
      <div className={`
        absolute -top-[10%] -right-[10%] w-[200%] h-[200%]
        bg-gradient-radial ${glowClass}
        animate-pulse-slow
      `} />
      
      {/* Secondary pulsing glow */}
      <div className={`
        absolute top-8 right-8
        w-48 h-48
        bg-gradient-radial ${glowClass}
        animate-pulse-medium
        blur-3xl
      `} />
      
      {/* Tertiary close glow */}
      <div className={`
        absolute top-8 right-8
        w-32 h-32
        bg-gradient-radial ${glowClass}
        animate-pulse-fast
        blur-xl
      `} />
      
      {/* Icon container */}
      <div className="absolute top-8 right-8">
        <div className={`relative z-10 ${wrapperClass}`}>
          {timeOfDay === 'morning' ? renderMorningComposition() :
           timeOfDay === 'afternoon' ? renderAfternoonComposition() :
           <Icon className={iconSize} strokeWidth={1.5} />}
        </div>
      </div>
    </div>
  );
};