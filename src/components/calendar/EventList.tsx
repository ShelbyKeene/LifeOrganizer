import React from 'react';
import { CalendarEvent } from '../../types/calendar';
import { Trash2 } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/dateUtils';

interface EventListProps {
  events: CalendarEvent[];
  onDelete: (eventId: string) => void;
  onUpdate: (event: CalendarEvent) => void;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  onDelete,
  onUpdate,
}) => {
  const upcomingEvents = events
    .filter(event => event.startDate >= new Date())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  if (upcomingEvents.length === 0) {
    return (
      <div className="text-center py-8 text-white/70">
        <p className="font-light">No upcoming events</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-light text-white mb-4">Upcoming Events</h3>
      
      {upcomingEvents.map(event => (
        <div
          key={event.id}
          className="p-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors group"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-white font-light">{event.title}</h4>
              <p className="text-sm text-white/70 mt-1">
                {formatDate(event.startDate)} at {formatTime(event.startDate)}
              </p>
              {event.description && (
                <p className="text-sm text-white/50 mt-2 line-clamp-2">
                  {event.description}
                </p>
              )}
            </div>
            <button
              onClick={() => onDelete(event.id)}
              className="text-white/30 hover:text-white/70 transition-colors ml-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};