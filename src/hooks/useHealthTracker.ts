import { useState, useCallback, useMemo } from 'react';
import { HealthMetrics, Exercise, HealthGoal } from '../types/health';
import { generateId } from '../utils/idUtils';

export const useHealthTracker = () => {
  const [metrics, setMetrics] = useState<HealthMetrics[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [goals, setGoals] = useState<HealthGoal[]>([]);

  const todayMetrics = useMemo(() => {
    return metrics.find(m => 
      new Date(m.date).toDateString() === new Date().toDateString()
    );
  }, [metrics]);

  const weeklyProgress = useMemo(() => {
    const today = new Date();
    const weekAgo = new Date(today.setDate(today.getDate() - 7));
    
    return metrics
      .filter(m => new Date(m.date) >= weekAgo)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [metrics]);

  const updateWaterIntake = useCallback((amount: number) => {
    setMetrics(prev => {
      const today = new Date().toDateString();
      const todayMetrics = prev.find(m => 
        new Date(m.date).toDateString() === today
      );

      if (todayMetrics) {
        return prev.map(m => 
          m.id === todayMetrics.id
            ? { ...m, waterIntake: amount }
            : m
        );
      }

      return [...prev, {
        id: generateId(),
        date: new Date(),
        waterIntake: amount,
      }];
    });
  }, []);

  const addHealthMetrics = useCallback((newMetrics: Omit<HealthMetrics, 'id' | 'date' | 'waterIntake'>) => {
    setMetrics(prev => {
      const today = new Date().toDateString();
      const todayMetrics = prev.find(m => 
        new Date(m.date).toDateString() === today
      );

      if (todayMetrics) {
        return prev.map(m => 
          m.id === todayMetrics.id
            ? { ...m, ...newMetrics }
            : m
        );
      }

      return [...prev, {
        id: generateId(),
        date: new Date(),
        waterIntake: 0,
        ...newMetrics,
      }];
    });
  }, []);

  const addExercise = useCallback((exercise: Omit<Exercise, 'id' | 'date'>) => {
    setExercises(prev => [...prev, {
      ...exercise,
      id: generateId(),
      date: new Date(),
    }]);
  }, []);

  const addGoal = useCallback((goal: Omit<HealthGoal, 'id' | 'progress'>) => {
    setGoals(prev => [...prev, {
      ...goal,
      id: generateId(),
      progress: 0,
    }]);
  }, []);

  const deleteGoal = useCallback((goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  }, []);

  // Update goal progress based on metrics
  useMemo(() => {
    setGoals(prevGoals => prevGoals.map(goal => {
      const latestMetric = todayMetrics;
      if (!latestMetric) return goal;

      let progress = 0;
      switch (goal.type) {
        case 'water':
          progress = (latestMetric.waterIntake / goal.target) * 100;
          break;
        case 'weight':
          if (latestMetric.weight) {
            progress = ((latestMetric.weight - goal.target) / goal.target) * 100;
          }
          break;
        case 'steps':
          if (latestMetric.steps) {
            progress = (latestMetric.steps / goal.target) * 100;
          }
          break;
        case 'sleep':
          if (latestMetric.sleepHours) {
            progress = (latestMetric.sleepHours / goal.target) * 100;
          }
          break;
      }

      return { ...goal, progress };
    }));
  }, [todayMetrics]);

  return {
    metrics,
    exercises,
    goals,
    todayMetrics,
    weeklyProgress,
    updateWaterIntake,
    addHealthMetrics,
    addExercise,
    addGoal,
    deleteGoal,
  };
};