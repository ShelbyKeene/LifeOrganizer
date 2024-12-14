export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  targetDays: number; // Number of times to complete per frequency period
  streak: number;
  completedDates: Date[];
  category: HabitCategory;
  reminder?: HabitReminder;
}

export type HabitCategory = 
  | 'health'
  | 'productivity'
  | 'mindfulness'
  | 'learning'
  | 'fitness'
  | 'other';

export interface HabitReminder {
  enabled: boolean;
  time: string; // HH:mm format
  days: number[]; // 0-6 (Sunday-Saturday)
}

export interface HabitCompletion {
  habitId: string;
  date: Date;
  notes?: string;
}