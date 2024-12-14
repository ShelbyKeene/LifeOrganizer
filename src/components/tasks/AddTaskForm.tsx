import React, { useState } from 'react';
import { Task } from '../../types';

interface AddTaskFormProps {
  onAdd: (task: Omit<Task, 'id' | 'completed'>) => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [recurring, setRecurring] = useState<Task['recurring']>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      dueDate: new Date(dueDate),
      recurring,
    });

    setTitle('');
    setDueDate(new Date().toISOString().split('T')[0]);
    setRecurring(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white/90 mb-2 font-light">Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          placeholder="Enter task title..."
        />
      </div>

      <div>
        <label className="block text-white/90 mb-2 font-light">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-white/90 mb-2 font-light">Recurring</label>
        <select
          value={recurring || ''}
          onChange={(e) => setRecurring(e.target.value as Task['recurring'])}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
        >
          <option value="">Not recurring</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white font-light hover:bg-white/30 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
};