import React, { useState } from 'react';
import { HealthGoal } from '../../types/health';
import { Target, Plus, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

interface HealthGoalsProps {
  goals: HealthGoal[];
  onAddGoal: (goal: Omit<HealthGoal, 'id' | 'progress'>) => void;
  onDeleteGoal: (goalId: string) => void;
}

export const HealthGoals: React.FC<HealthGoalsProps> = ({
  goals,
  onAddGoal,
  onDeleteGoal,
}) => {
  const [newGoal, setNewGoal] = useState({
    type: 'water' as HealthGoal['type'],
    target: '',
    deadline: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.target || !newGoal.deadline) return;

    onAddGoal({
      type: newGoal.type,
      target: Number(newGoal.target),
      deadline: new Date(newGoal.deadline),
      startDate: new Date(),
    });

    setNewGoal({
      type: 'water',
      target: '',
      deadline: '',
    });
  };

  const getGoalLabel = (type: HealthGoal['type']) => {
    switch (type) {
      case 'water': return 'Daily Water (ml)';
      case 'weight': return 'Target Weight (kg)';
      case 'steps': return 'Daily Steps';
      case 'sleep': return 'Sleep Hours';
      default: return '';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500/50';
    if (progress >= 75) return 'bg-blue-500/50';
    if (progress >= 50) return 'bg-yellow-500/50';
    return 'bg-red-500/50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-light text-white flex items-center gap-2">
          <Target className="w-6 h-6" />
          Health Goals
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={newGoal.type}
          onChange={(e) => setNewGoal(prev => ({ ...prev, type: e.target.value as HealthGoal['type'] }))}
          className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
        >
          <option value="water">Water Intake</option>
          <option value="weight">Weight</option>
          <option value="steps">Steps</option>
          <option value="sleep">Sleep</option>
        </select>

        <input
          type="number"
          value={newGoal.target}
          onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
          placeholder="Target value"
          className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
        />

        <input
          type="date"
          value={newGoal.deadline}
          onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
          className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
        />

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Goal</span>
        </button>
      </form>

      <div className="grid gap-4">
        {goals.map(goal => (
          <div
            key={goal.id}
            className="p-4 rounded-lg bg-white/10 hover:bg-white/15 transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-light text-white">{getGoalLabel(goal.type)}</h4>
              <button
                onClick={() => onDeleteGoal(goal.id)}
                className="text-white/30 hover:text-white/70 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/70">
                <span>Target: {goal.target}</span>
                <span>Deadline: {formatDate(goal.deadline)}</span>
              </div>

              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full transition-all duration-500 ${getProgressColor(goal.progress)}`}
                  style={{ width: `${Math.min(goal.progress, 100)}%` }}
                />
              </div>

              <div className="text-right text-sm text-white/50">
                {goal.progress.toFixed(1)}% completed
              </div>
            </div>
          </div>
        ))}

        {goals.length === 0 && (
          <div className="text-center py-8 text-white/50">
            No goals set. Add a goal to start tracking your progress!
          </div>
        )}
      </div>
    </div>
  );
};