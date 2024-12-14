import { useState, useCallback } from 'react';
import { CalendarEvent } from '../types/calendar';
import { generateId } from '../utils/idUtils';

export const useCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const addEvent = useCallback((event: Omit<CalendarEvent, 'id'>) => {
    setEvents(prev => [...prev, { ...event, id: generateId() }]);
  }, []);

  const updateEvent = useCallback((event: CalendarEvent) => {
    setEvents(prev => prev.map(e => e.id === event.id ? event : e));
  }, []);

  const deleteEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  }, []);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};