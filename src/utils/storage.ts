import { Task } from '../types/tasks';
import { Recipe, MealPlan } from '../types/meals';
import { CalendarEvent } from '../types/calendar';
import { HealthMetrics, HealthGoal, Exercise } from '../types/health';
import { Habit } from '../types/habits';

const STORAGE_KEYS = {
  TASKS: 'life-organizer-tasks',
  RECIPES: 'life-organizer-recipes',
  MEAL_PLANS: 'life-organizer-meal-plans',
  EVENTS: 'life-organizer-events',
  HEALTH_METRICS: 'life-organizer-health-metrics',
  HEALTH_GOALS: 'life-organizer-health-goals',
  EXERCISES: 'life-organizer-exercises',
  HABITS: 'life-organizer-habits',
  USER_SETTINGS: 'life-organizer-settings',
};

export const storage = {
  // Generic save and load functions
  save: <T>(key: string, data: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving data for key ${key}:`, error);
    }
  },

  load: <T>(key: string, defaultValue: T): T => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Error loading data for key ${key}:`, error);
      return defaultValue;
    }
  },

  // Feature-specific functions
  tasks: {
    save: (tasks: Task[]) => storage.save(STORAGE_KEYS.TASKS, tasks),
    load: () => storage.load<Task[]>(STORAGE_KEYS.TASKS, []),
  },

  recipes: {
    save: (recipes: Recipe[]) => storage.save(STORAGE_KEYS.RECIPES, recipes),
    load: () => storage.load<Recipe[]>(STORAGE_KEYS.RECIPES, []),
  },

  mealPlans: {
    save: (plans: MealPlan[]) => storage.save(STORAGE_KEYS.MEAL_PLANS, plans),
    load: () => storage.load<MealPlan[]>(STORAGE_KEYS.MEAL_PLANS, []),
  },

  events: {
    save: (events: CalendarEvent[]) => storage.save(STORAGE_KEYS.EVENTS, events),
    load: () => storage.load<CalendarEvent[]>(STORAGE_KEYS.EVENTS, []),
  },

  healthMetrics: {
    save: (metrics: HealthMetrics[]) => storage.save(STORAGE_KEYS.HEALTH_METRICS, metrics),
    load: () => storage.load<HealthMetrics[]>(STORAGE_KEYS.HEALTH_METRICS, []),
  },

  healthGoals: {
    save: (goals: HealthGoal[]) => storage.save(STORAGE_KEYS.HEALTH_GOALS, goals),
    load: () => storage.load<HealthGoal[]>(STORAGE_KEYS.HEALTH_GOALS, []),
  },

  exercises: {
    save: (exercises: Exercise[]) => storage.save(STORAGE_KEYS.EXERCISES, exercises),
    load: () => storage.load<Exercise[]>(STORAGE_KEYS.EXERCISES, []),
  },

  habits: {
    save: (habits: Habit[]) => storage.save(STORAGE_KEYS.HABITS, habits),
    load: () => storage.load<Habit[]>(STORAGE_KEYS.HABITS, []),
  },

  // Data export functionality
  exportData: () => {
    const data = {
      tasks: storage.tasks.load(),
      recipes: storage.recipes.load(),
      mealPlans: storage.mealPlans.load(),
      events: storage.events.load(),
      healthMetrics: storage.healthMetrics.load(),
      healthGoals: storage.healthGoals.load(),
      exercises: storage.exercises.load(),
      habits: storage.habits.load(),
      settings: storage.load(STORAGE_KEYS.USER_SETTINGS, {}),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `life-organizer-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Data import functionality
  importData: async (file: File): Promise<boolean> => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validate data structure
      const requiredKeys = ['tasks', 'recipes', 'mealPlans', 'events', 'healthMetrics', 
                           'healthGoals', 'exercises', 'habits'];
      
      if (!requiredKeys.every(key => key in data)) {
        throw new Error('Invalid backup file format');
      }

      // Import all data
      storage.tasks.save(data.tasks);
      storage.recipes.save(data.recipes);
      storage.mealPlans.save(data.mealPlans);
      storage.events.save(data.events);
      storage.healthMetrics.save(data.healthMetrics);
      storage.healthGoals.save(data.healthGoals);
      storage.exercises.save(data.exercises);
      storage.habits.save(data.habits);

      if (data.settings) {
        storage.save(STORAGE_KEYS.USER_SETTINGS, data.settings);
      }

      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },
};