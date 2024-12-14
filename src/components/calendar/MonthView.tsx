import React from 'react';
import { CalendarEvent } from '../../types/calendar';
import { getDaysInMonth, isSameDay } from '../../utils/dateUtils';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onEventClick,
}) => {
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startingDayOfWeek = firstDayOfMonth.getDay();

  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Week day headers */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div
          key={day}
          className="p-2 text-center text-white/70 text-sm font-light"
        >
          {day}
        </div>
      ))}

      {/* Empty cells for days before the first of the month */}
      {Array.from({ length: startingDayOfWeek }).map((_, index) => (
        <div
          key={`empty-${index}`}
          className="aspect-square p-2 bg-white/5 rounded-lg"
        />
      ))}

      {/* Calendar days */}
      {Array.from({ length: daysInMonth }).map((_, index) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
        const dayEvents = events.filter(event => isSameDay(event.startDate, date));
        const isToday = isSameDay(date, new Date());

        return (
          <div
            key={index}
            className={`
              aspect-square p-2 rounded-lg transition-colors
              ${isToday ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'}
            `}
          >
            <div className="text-sm text-white/70 mb-1">{index + 1}</div>
            <div className="space-y-1">
              {dayEvents.slice(0, 3).map(event => (
                <button
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="w-full text-left text-xs px-1 py-0.5 rounded bg-white/10 text-white truncate hover:bg-white/20 transition-colors"
                >
                  {event.title}
                </button>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-white/50 text-center">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};