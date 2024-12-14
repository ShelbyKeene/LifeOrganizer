import React, { useState } from 'react';
import { SectionHeader } from '../Typography';
import { GlassCard } from '../GlassCard';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventList } from './EventList';
import { AddEventForm } from './AddEventForm';
import { useCalendar } from '../../hooks/useCalendar';
import { CalendarNav } from './CalendarNav';

export const CalendarSection: React.FC = () => {
  const [view, setView] = useState<'month' | 'week'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const { events, addEvent, updateEvent, deleteEvent } = useCalendar();

  return (
    <div className="space-y-6">
      <SectionHeader>Calendar</SectionHeader>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <GlassCard>
            <CalendarNav
              view={view}
              onViewChange={setView}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
            />
            {view === 'month' ? (
              <MonthView
                currentDate={currentDate}
                events={events}
                onEventClick={updateEvent}
              />
            ) : (
              <WeekView
                currentDate={currentDate}
                events={events}
                onEventClick={updateEvent}
              />
            )}
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard>
            <AddEventForm onAdd={addEvent} />
          </GlassCard>

          <GlassCard>
            <EventList
              events={events}
              onDelete={deleteEvent}
              onUpdate={updateEvent}
            />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};