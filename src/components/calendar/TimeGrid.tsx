import React from 'react';
import { CalendarEvent } from '../../types/calendar';
import { getEventDuration, getCategoryColor } from '../../utils/calendarUtils';

interface TimeGridProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export const TimeGrid: React.FC<TimeGridProps> = ({ events, onEventClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventStyle = (event: CalendarEvent) => {
    const startHour = event.startDate.getHours();
    const startMinute = event.startDate.getMinutes();
    const duration = getEventDuration(event);
    
    const top = (startHour + startMinute / 60) * 60;
    const height = duration;
    
    return {
      top: \`\${top}px\`,
      height: \`\${height}px\`,
      position: 'absolute' as const,
      left: '60px',
      right: '8px',
    };
  };

  return (
    <div className="relative h-[1440px]"> {/* 24 hours * 60px */}
      {hours.map(hour => (
        <div
          key={hour}
          className="absolute w-full h-[60px] border-t border-white/10"
          style={{ top: hour * 60 }}
        >
          <span className="text-xs text-white/50 absolute -top-3 left-2">
            {hour.toString().padStart(2, '0')}:00
          </span>
        </div>
      ))}

      {events.map(event => (
        <button
          key={event.id}
          onClick={() => onEventClick(event)}
          className={`
            rounded px-2 py-1 text-left
            ${getCategoryColor(event.category)}
            hover:brightness-110 transition-all
          `}
          style={getEventStyle(event)}
        >
          <div className="text-xs font-light text-white truncate">
            {event.title}
          </div>
          <div className="text-[10px] text-white/70">
            {event.startDate.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        </button>
      ))}
    </div>
  );
};