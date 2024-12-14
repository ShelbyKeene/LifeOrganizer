import React, { useState } from 'react';
import { Habit } from '../../types/habits';

interface AddHabitFormProps {
  onAdd: (habit: Omit<Habit, 'id' | 'streak' | 'completedDates'>) => void;
}

export const AddHabitForm: React.FC<AddHabitFormProps> = ({ onAdd }) => {
  const [habit, setHabit] = useState({
    name: '',
    description: '',
    frequency: 'daily' as Habit['frequency'],
    targetDays: 1,
    category: 'other' as Habit['category'],
    reminder: {
      enabled: false,
      time: '09:00',
      days: [1, 2, 3, 4, 5],
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habit.name) return;

    onAdd({
      name: habit.name,
      description: habit.description,
      frequency: habit.frequency,
      targetDays: habit.targetDays,
      category: habit.category,
      reminder: habit.reminder.enabled ? habit.reminder : undefined,
    });

    setHabit({
      name: '',
      description: '',
      frequency: 'daily',
      targetDays: 1,
      category: 'other',
      reminder: {
        enabled: false,
        time: '09:00',
        days: [1, 2, 3, 4, 5],
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-light text-white mb-4">Add New Habit</h3>

      <div>
        <label className="block text-white/90 mb-2 font-light">Habit Name</label>
        <input
          type="text"
          value={habit.name}
          onChange={(e) => setHabit(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          placeholder="Enter habit name..."
        />
      </div>

      <div>
        <label className="block text-white/90 mb-2 font-light">Description (optional)</label>
        <textarea
          value={habit.description}
          onChange={(e) => setHabit(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          placeholder="Enter habit description..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white/90 mb-2 font-light">Frequency</label>
          <select
            value={habit.frequency}
            onChange={(e) => setHabit(prev => ({ ...prev, frequency: e.target.value as Habit['frequency'] }))}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block text-white/90 mb-2 font-light">Target Days</label>
          <input
            type="number"
            min="1"
            value={habit.targetDays}
            onChange={(e) => setHabit(prev => ({ ...prev, targetDays: Number(e.target.value) }))}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-white/90 mb-2 font-light">Category</label>
        <select
          value={habit.category}
          onChange={(e) => setHabit(prev => ({ ...prev, category: e.target.value as Habit['category'] }))}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
        >
          <option value="health">Health</option>
          <option value="productivity">Productivity</option>
          <option value="mindfulness">Mindfulness</option>
          <option value="learning">Learning</option>
          <option value="fitness">Fitness</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={habit.reminder.enabled}
            onChange={(e) => setHabit(prev => ({
              ...prev,
              reminder: { ...prev.reminder, enabled: e.target.checked }
            }))}
            className="rounded bg-white/10 border-white/20 text-white focus:ring-0"
          />
          <span className="text-white/90 font-light">Enable Reminder</span>
        </label>

        {habit.reminder.enabled && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/90 mb-2 font-light">Time</label>
              <input
                type="time"
                value={habit.reminder.time}
                onChange={(e) => setHabit(prev => ({
                  ...prev,
                  reminder: { ...prev.reminder, time: e.target.value }
                }))}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white font-light hover:bg-white/30 transition-colors"
      >
        Add Habit
      </button>
    </form>
  );
};