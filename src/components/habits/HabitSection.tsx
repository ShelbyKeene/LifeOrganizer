import React from 'react';
import { SectionHeader } from '../Typography';
import { GlassCard } from '../GlassCard';
import { HabitList } from './HabitList';
import { AddHabitForm } from './AddHabitForm';
import { HabitStats } from './HabitStats';
import { useHabitTracker } from '../../hooks/useHabitTracker';

export const HabitSection: React.FC = () => {
  const {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    completeHabit,
    getHabitsByCategory,
    getHabitProgress,
  } = useHabitTracker();

  return (
    <div className="space-y-6">
      <SectionHeader>Habit Tracking</SectionHeader>

      {/* Stats Overview - Full width on mobile, top of the page */}
      <div className="block lg:hidden">
        <GlassCard>
          <HabitStats
            habits={habits}
            getProgress={getHabitProgress}
          />
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Main Content Area */}
        <div className="space-y-6">
          {/* Stats for larger screens - Shown above habit list */}
          <div className="hidden lg:block">
            <GlassCard>
              <HabitStats
                habits={habits}
                getProgress={getHabitProgress}
              />
            </GlassCard>
          </div>

          {/* Habit List */}
          <GlassCard className="overflow-hidden">
            <HabitList
              habits={habits}
              onComplete={completeHabit}
              onDelete={deleteHabit}
              getProgress={getHabitProgress}
            />
          </GlassCard>
        </div>

        {/* Sidebar - Add Habit Form */}
        <div className="lg:sticky lg:top-6 space-y-6">
          <GlassCard>
            <AddHabitForm onAdd={addHabit} />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};