import { useState, useCallback, useMemo } from 'react';
import { Habit, HabitCompletion } from '../types/habits';
import { generateId } from '../utils/idUtils';
import { isSameDay } from '../utils/dateUtils';

export const useHabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);

  const addHabit = useCallback((habit: Omit<Habit, 'id' | 'streak' | 'completedDates'>) => {
    setHabits(prev => [...prev, {
      ...habit,
      id: generateId(),
      streak: 0,
      completedDates: [],
    }]);
  }, []);

  const updateHabit = useCallback((habit: Habit) => {
    setHabits(prev => prev.map(h => h.id === habit.id ? habit : h));
  }, []);

  const deleteHabit = useCallback((habitId: string) => {
    setHabits(prev => prev.filter(h => h.id !== habitId));
    setCompletions(prev => prev.filter(c => c.habitId !== habitId));
  }, []);

  const completeHabit = useCallback((habitId: string, notes?: string) => {
    const completion = {
      habitId,
      date: new Date(),
      notes,
    };

    setCompletions(prev => [...prev, completion]);
    
    setHabits(prev => prev.map(habit => {
      if (habit.id !== habitId) return habit;

      const today = new Date();
      const completedToday = habit.completedDates.some(date => 
        isSameDay(date, today)
      );

      if (completedToday) return habit;

      const newCompletedDates = [...habit.completedDates, today];
      let newStreak = habit.streak;

      // Calculate streak based on frequency
      const lastCompletion = habit.completedDates[habit.completedDates.length - 1];
      if (lastCompletion) {
        const daysDiff = Math.floor(
          (today.getTime() - lastCompletion.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (habit.frequency === 'daily' && daysDiff <= 1) {
          newStreak++;
        } else if (habit.frequency === 'weekly' && daysDiff <= 7) {
          newStreak++;
        } else if (habit.frequency === 'monthly' && daysDiff <= 31) {
          newStreak++;
        } else {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      return {
        ...habit,
        streak: newStreak,
        completedDates: newCompletedDates,
      };
    }));
  }, []);

  const getHabitsByCategory = useCallback((category: 'all' | Habit['category']) => {
    return category === 'all'
      ? habits
      : habits.filter(h => h.category === category);
  }, [habits]);

  const getHabitProgress = useCallback((habit: Habit) => {
    const today = new Date();
    let completionsInPeriod = 0;
    let totalRequired = habit.targetDays;

    switch (habit.frequency) {
      case 'daily':
        completionsInPeriod = habit.completedDates.filter(date => 
          isSameDay(date, today)
        ).length;
        break;
      case 'weekly':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        completionsInPeriod = habit.completedDates.filter(date => 
          date >= weekStart && date <= today
        ).length;
        break;
      case 'monthly':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        completionsInPeriod = habit.completedDates.filter(date => 
          date >= monthStart && date <= today
        ).length;
        break;
    }

    return {
      completed: completionsInPeriod,
      total: totalRequired,
      percentage: (completionsInPeriod / totalRequired) * 100,
    };
  }, []);

  return {
    habits,
    completions,
    addHabit,
    updateHabit,
    deleteHabit,
    completeHabit,
    getHabitsByCategory,
    getHabitProgress,
  };
};