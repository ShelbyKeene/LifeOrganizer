import { CalendarEvent } from '../types/calendar';

export const getWeekDays = (date: Date): Date[] => {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    return day;
  });
};

export const getMonthDays = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const days: Date[] = [];
  
  // Add days from previous month to fill the first week
  for (let i = 0; i < firstDay.getDay(); i++) {
    const day = new Date(firstDay);
    day.setDate(day.getDate() - (firstDay.getDay() - i));
    days.push(day);
  }
  
  // Add days of current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  
  // Add days from next month to complete the last week
  const remainingDays = 7 - (days.length % 7);
  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(lastDay);
      day.setDate(lastDay.getDate() + i);
      days.push(day);
    }
  }
  
  return days;
};

export const getEventsForDay = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter(event => {
    const eventDate = new Date(event.startDate);
    return (
      eventDate.getFullYear() === date.getFullYear() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getDate() === date.getDate()
    );
  });
};

export const getEventDuration = (event: CalendarEvent): number => {
  return Math.ceil(
    (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60)
  );
};

export const getCategoryColor = (category: CalendarEvent['category']): string => {
  const colors = {
    personal: 'bg-blue-500/50',
    work: 'bg-purple-500/50',
    health: 'bg-green-500/50',
    bills: 'bg-red-500/50',
    social: 'bg-yellow-500/50',
    other: 'bg-gray-500/50',
  };
  return colors[category];
};