import React, { useState } from 'react';
import { Habit } from '../../types/habits';
import { HabitItem } from './HabitItem';
import { Filter, ChevronDown } from 'lucide-react';

interface HabitListProps {
  habits: Habit[];
  onComplete: (habitId: string, notes?: string) => void;
  onDelete: (habitId: string) => void;
  getProgress: (habit: Habit) => { completed: number; total: number; percentage: number };
}

export const HabitList: React.FC<HabitListProps> = ({
  habits,
  onComplete,
  onDelete,
  getProgress,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Habit['category']>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'All Habits' },
    { value: 'health', label: 'Health' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'mindfulness', label: 'Mindfulness' },
    { value: 'learning', label: 'Learning' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'other', label: 'Other' },
  ];

  const filteredHabits = selectedCategory === 'all'
    ? habits
    : habits.filter(h => h.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-light text-white flex items-center gap-2">
          <Filter className="w-6 h-6" />
          Your Habits
        </h3>

        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            {categories.find(c => c.value === selectedCategory)?.label}
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 py-2 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg z-10">
              {categories.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => {
                    setSelectedCategory(value as any);
                    setIsDropdownOpen(false);
                  }}
                  className={`
                    w-full px-4 py-2 text-left transition-colors
                    ${selectedCategory === value
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Habits Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {filteredHabits.length > 0 ? (
          filteredHabits.map(habit => (
            <HabitItem
              key={habit.id}
              habit={habit}
              progress={getProgress(habit)}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-white/50">
            No habits found. Add some habits to start tracking!
          </div>
        )}
      </div>
    </div>
  );
};