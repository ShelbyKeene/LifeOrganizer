import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { formatTime } from '../../utils/dateUtils';
import { useCalendar } from '../../hooks/useCalendar';

export const DailyEvents: React.FC = () => {
  const { events } = useCalendar();
  const today = new Date();
  
  const todayEvents = events
    .filter(event => event.startDate.toDateString() === today.toDateString())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-light flex items-center gap-2">
        <Calendar className="w-6 h-6" />
        Today's Events
      </h3>

      <div className="space-y-3">
        {todayEvents.length > 0 ? (
          todayEvents.map(event => (
            <div
              key={event.id}
              className="p-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div>{event.title}</div>
                  {event.description && (
                    <div className="text-sm opacity-70 mt-1">
                      {event.description}
                    </div>
                  )}
                </div>
                <div className="opacity-70 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatTime(event.startDate)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 opacity-70">
            No events scheduled for today
          </div>
        )}
      </div>
    </div>
  );
};