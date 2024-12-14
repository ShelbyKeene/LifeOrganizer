import React from 'react';
import { Habit } from '../../types/habits';
import { TrendingUp, Award, Target } from 'lucide-react';

interface HabitStatsProps {
  habits: Habit[];
  getProgress: (habit: Habit) => { completed: number; total: number; percentage: number };
}

export const HabitStats: React.FC<HabitStatsProps> = ({ habits, getProgress }) => {
  const totalHabits = habits.length;
  const activeStreaks = habits.filter(h => h.streak > 0).length;
  const completedToday = habits.filter(h => 
    getProgress(h).completed > 0
  ).length;

  const averageCompletion = habits.length > 0
    ? habits.reduce((sum, habit) => sum + getProgress(habit).percentage, 0) / habits.length
    : 0;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-light text-white flex items-center gap-2">
        <TrendingUp className="w-6 h-6" />
        Statistics
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70">Total Habits</span>
            <Target className="w-5 h-5 text-white/50" />
          </div>
          <p className="text-2xl font-light text-white">{totalHabits}</p>
        </div>

        <div className="p-4 rounded-lg bg-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70">Active Streaks</span>
            <Award className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-2xl font-light text-white">{activeStreaks}</p>
        </div>

        <div className="col-span-2 lg:col-span-1 p-4 rounded-lg bg-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70">Completed Today</span>
            <div className="text-green-400">{completedToday}/{totalHabits}</div>
          </div>
          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-green-500/50 transition-all duration-500"
              style={{ width: `${(completedToday / totalHabits) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-white/10">
        <h4 className="text-lg font-light text-white mb-4">Overall Progress</h4>
        <div className="relative h-4 bg-white/5 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-blue-500/50 transition-all duration-500"
            style={{ width: `${averageCompletion}%` }}
          />
        </div>
        <div className="mt-2 text-right text-sm text-white/70">
          {averageCompletion.toFixed(1)}% average completion
        </div>
      </div>
    </div>
  );
};