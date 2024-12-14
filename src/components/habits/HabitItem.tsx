import React from 'react';
import { Habit } from '../../types/habits';
import { CheckCircle2, Trash2, Award } from 'lucide-react';

interface HabitItemProps {
  habit: Habit;
  progress: { completed: number; total: number; percentage: number };
  onComplete: (habitId: string) => void;
  onDelete: (habitId: string) => void;
}

export const HabitItem: React.FC<HabitItemProps> = ({
  habit,
  progress,
  onComplete,
  onDelete,
}) => {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500/50';
    if (percentage >= 75) return 'bg-blue-500/50';
    if (percentage >= 50) return 'bg-yellow-500/50';
    return 'bg-red-500/50';
  };

  return (
    <div className="p-4 rounded-lg bg-white/10 hover:bg-white/15 transition-colors group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-light text-white">{habit.name}</h4>
            <div className="flex items-center space-x-2">
              {habit.streak > 0 && (
                <div className="flex items-center gap-1 text-yellow-400">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">{habit.streak}</span>
                </div>
              )}
              <button
                onClick={() => onDelete(habit.id)}
                className="text-white/30 hover:text-white/70 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {habit.description && (
            <p className="text-sm text-white/70 mb-3">{habit.description}</p>
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/70">
              <span>
                {progress.completed} / {progress.total} {habit.frequency}
              </span>
              <span className="capitalize">{habit.category}</span>
            </div>

            <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full transition-all duration-500 ${getProgressColor(progress.percentage)}`}
                style={{ width: `${Math.min(progress.percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => onComplete(habit.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Complete</span>
        </button>
      </div>
    </div>
  );
};