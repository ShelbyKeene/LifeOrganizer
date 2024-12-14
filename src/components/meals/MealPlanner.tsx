import React, { useState } from 'react';
import { MealPlan } from '../../types/meals';
import { DayPlanner } from './DayPlanner';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const MealPlanner: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDate(prev => addDays(prev, -7))}
          className="text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-light text-white">
          Week of {currentDate.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>

        <button
          onClick={() => setCurrentDate(prev => addDays(prev, 7))}
          className="text-white/70 hover:text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="grid gap-4">
        {[...Array(7)].map((_, i) => (
          <DayPlanner 
            key={i} 
            date={addDays(currentDate, i)}
          />
        ))}
      </div>
    </div>
  );
};