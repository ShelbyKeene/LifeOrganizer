import React from 'react';
import { CalendarEvent } from '../../types/calendar';
import { getCategoryColor } from '../../utils/calendarUtils';
import { isSameDay } from '../../utils/dateUtils';

interface DayCellProps {
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth?: boolean;
  onEventClick: (event: CalendarEvent) => void;
  onAddClick: (date: Date) => void;
}

export const DayCell: React.FC<DayCellProps> = ({
  date,
  events,
  isCurrentMonth = true,
  onEventClick,
  onAddClick,
}) => {
  const isToday = isSameDay(date, new Date());

  return (
    <div
      className={`
        min-h-[120px] p-2 border-t border-white/10
        ${isCurrentMonth ? 'bg-white/5' : 'bg-white/2'}
        ${isToday ? 'ring-2 ring-white/20' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`
          text-sm
          ${isCurrentMonth ? 'text-white/70' : 'text-white/30'}
          ${isToday ? 'font-medium text-white' : ''}
        `}>
          {date.getDate()}
        </span>
        <button
          onClick={() => onAddClick(date)}
          className="opacity-0 group-hover:opacity-100 text-white/50 hover:text-white transition-all"
        >
          +
        </button>
      </div>

      <div className="space-y-1">
        {events.map(event => (
          <button
            key={event.id}
            onClick={() => onEventClick(event)}
            className={`
              w-full text-left text-xs px-2 py-1 rounded
              ${getCategoryColor(event.category)}
              hover:brightness-110 transition-all
            `}
          >
            <div className="truncate text-white">
              {event.title}
            </div>
            <div className="text-white/70 text-[10px]">
              {new Date(event.startDate).toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};