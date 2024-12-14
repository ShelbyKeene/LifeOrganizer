import React from 'react';
import { EventCategory } from '../../types/calendar';
import { getCategoryColor } from '../../utils/calendarUtils';

const categories: { value: EventCategory; label: string }[] = [
  { value: 'personal', label: 'Personal' },
  { value: 'work', label: 'Work' },
  { value: 'health', label: 'Health' },
  { value: 'bills', label: 'Bills' },
  { value: 'social', label: 'Social' },
  { value: 'other', label: 'Other' },
];

export const CategoryLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(({ value, label }) => (
        <div
          key={value}
          className="flex items-center space-x-2"
        >
          <div className={`w-3 h-3 rounded ${getCategoryColor(value)}`} />
          <span className="text-sm text-white/70">{label}</span>
        </div>
      ))}
    </div>
  );
};