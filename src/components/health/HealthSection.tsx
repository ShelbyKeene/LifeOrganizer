import React from 'react';
import { SectionHeader } from '../Typography';
import { GlassCard } from '../GlassCard';
import { WaterTracker } from './WaterTracker';
import { HealthMetricsForm } from './HealthMetricsForm';
import { ProgressCharts } from './ProgressCharts';
import { ExerciseLog } from './ExerciseLog';
import { HealthGoals } from './HealthGoals';
import { useHealthTracker } from '../../hooks/useHealthTracker';

export const HealthSection: React.FC = () => {
  const {
    todayMetrics,
    updateWaterIntake,
    addHealthMetrics,
    exercises,
    addExercise,
    weeklyProgress,
    goals,
    addGoal,
    deleteGoal,
  } = useHealthTracker();

  return (
    <div className="space-y-6">
      <SectionHeader>Health & Wellness</SectionHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard>
          <WaterTracker
            currentIntake={todayMetrics?.waterIntake || 0}
            onUpdate={updateWaterIntake}
          />
        </GlassCard>

        <GlassCard>
          <HealthMetricsForm onSubmit={addHealthMetrics} />
        </GlassCard>
      </div>

      <GlassCard>
        <HealthGoals
          goals={goals}
          onAddGoal={addGoal}
          onDeleteGoal={deleteGoal}
        />
      </GlassCard>

      <GlassCard>
        <ProgressCharts weeklyProgress={weeklyProgress} />
      </GlassCard>

      <GlassCard>
        <ExerciseLog
          exercises={exercises}
          onAdd={addExercise}
        />
      </GlassCard>
    </div>
  );
};