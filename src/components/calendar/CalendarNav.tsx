import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List } from 'lucide-react';

interface CalendarNavProps {
  view: 'month' | 'week';
  onViewChange: (view: 'month' | 'week') => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const CalendarNav: React.FC<CalendarNavProps> = ({
  view,
  onViewChange,
  currentDate,
  onDateChange,
}) => {
  const addMonths = (date: Date, months: number) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  };

  const addWeeks = (date: Date, weeks: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + weeks * 7);
    return newDate;
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    const amount = direction === 'prev' ? -1 : 1;
    onDateChange(view === 'month' ? addMonths(currentDate, amount) : addWeeks(currentDate, amount));
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleNavigate('prev')}
          className="text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-light text-white">
          {currentDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
            ...(view === 'week' && { day: 'numeric' }),
          })}
        </h3>

        <button
          onClick={() => handleNavigate('next')}
          className="text-white/70 hover:text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onViewChange('month')}
          className={`
            p-2 rounded-lg transition-colors
            ${view === 'month'
              ? 'bg-white/20 text-white'
              : 'text-white/70 hover:bg-white/10'
            }
          `}
        >
          <CalendarIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewChange('week')}
          className={`
            p-2 rounded-lg transition-colors
            ${view === 'week'
              ? 'bg-white/20 text-white'
              : 'text-white/70 hover:bg-white/10'
            }
          `}
        >
          <List className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};