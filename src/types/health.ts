export interface HealthMetrics {
  id: string;
  date: Date;
  waterIntake: number; // in milliliters
  weight?: number; // in kg
  steps?: number;
  sleepHours?: number;
  mood?: 'great' | 'good' | 'okay' | 'poor';
}

export interface HealthGoal {
  id: string;
  type: 'water' | 'weight' | 'steps' | 'sleep';
  target: number;
  deadline?: Date;
  startDate: Date;
  progress: number;
}

export interface Exercise {
  id: string;
  date: Date;
  type: string;
  duration: number; // in minutes
  intensity: 'low' | 'medium' | 'high';
  calories?: number;
  notes?: string;
}