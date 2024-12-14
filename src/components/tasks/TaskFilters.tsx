import React from 'react';
import { FilterType } from '../../types';

interface TaskFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ currentFilter, onFilterChange }) => {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex space-x-2 mb-4">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`
            px-4 py-2 rounded-lg font-light transition-all
            ${currentFilter === value
              ? 'bg-white/20 text-white'
              : 'text-white/70 hover:bg-white/10'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
};