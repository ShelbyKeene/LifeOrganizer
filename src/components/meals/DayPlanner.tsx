import React from 'react';
import { Recipe } from '../../types/meals';
import { Plus } from 'lucide-react';

interface DayPlannerProps {
  date: Date;
}

export const DayPlanner: React.FC<DayPlannerProps> = ({ date }) => {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div className={`
      p-4 rounded-lg transition-all duration-300
      ${isToday ? 'bg-white/20' : 'bg-white/10'}
    `}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-light text-white">{dayName}</h4>
        <span className="text-sm text-white/70">
          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
          <div key={meal} className="space-y-2">
            <p className="text-sm font-light text-white/70">{meal}</p>
            <button className="w-full h-24 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center group">
              <Plus className="w-6 h-6 text-white/50 group-hover:text-white/70 transition-colors" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};