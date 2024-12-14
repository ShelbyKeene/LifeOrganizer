import React from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const WeekHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-7">
      {WEEKDAYS.map(day => (
        <div
          key={day}
          className="py-2 text-center text-sm font-light text-white/70"
        >
          {day}
        </div>
      ))}
    </div>
  );
};