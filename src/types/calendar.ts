export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  category: EventCategory;
  reminder?: ReminderSettings;
  recurring?: RecurringSettings;
}

export type EventCategory = 
  | 'personal'
  | 'work'
  | 'health'
  | 'bills'
  | 'social'
  | 'other';

export interface ReminderSettings {
  enabled: boolean;
  time: number; // minutes before event
}

export interface RecurringSettings {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: Date;
}