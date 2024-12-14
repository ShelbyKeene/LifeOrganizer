export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

export type FilterType = 'all' | 'active' | 'completed';

export interface User {
  name: string;
  tasks: Task[];
  habits: Habit[];
  waterIntake: number;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
  recurring?: 'daily' | 'weekly' | 'monthly';
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
}