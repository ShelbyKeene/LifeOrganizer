import React from 'react';
import { CalendarEvent } from '../../types/calendar';
import { addDays, isSameDay, formatTime } from '../../utils/dateUtils';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onEventClick,
}) => {
  // Get the start of the week (Sunday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  return (
    <div className="space-y-4">
      {Array.from({ length: 7 }).map((_, index) => {
        const date = addDays(startOfWeek, index);
        const dayEvents = events.filter(event => isSameDay(event.startDate, date));
        const isToday = isSameDay(date, new Date());

        return (
          <div
            key={index}
            className={`
              p-4 rounded-lg transition-colors
              ${isToday ? 'bg-white/20' : 'bg-white/10'}
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-light text-white">
                {date.toLocaleDateString('en-US', { weekday: 'long' })}
              </h4>
              <span className="text-sm text-white/70">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>

            <div className="space-y-2">
              {dayEvents.map(event => (
                <button
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="w-full text-left p-2 rounded bg-white/10 hover:bg-white/20 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white group-hover:text-white/90">
                      {event.title}
                    </span>
                    <span className="text-sm text-white/70">
                      {formatTime(event.startDate)}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-sm text-white/50 mt-1 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                </button>
              ))}
              {dayEvents.length === 0 && (
                <div className="text-center py-4 text-white/50">
                  No events scheduled
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};