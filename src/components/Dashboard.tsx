import React, { useState } from 'react';
import { NavButton } from './NavButton';
import { CheckCircle2, Utensils, Calendar, Activity } from 'lucide-react';
import { getGreeting } from '../utils/timeUtils';
import { GlassCard } from './GlassCard';
import { PageHeader, SubHeader } from './Typography';
import { Navigation } from './Navigation';
import { TaskSection } from './tasks/TaskSection';
import { MealSection } from './meals/MealSection';
import { CalendarSection } from './calendar/CalendarSection';
import { HealthSection } from './health/HealthSection';

export const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('tasks');
  const userName = 'Sarah'; // This would come from user context/state

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'tasks':
        return <TaskSection />;
      case 'meals':
        return <MealSection />;
      case 'calendar':
        return <CalendarSection />;
      case 'health':
        return <HealthSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-8 py-12">
        <header className="mb-12 text-center">
          <PageHeader>Life Organizer</PageHeader>
          <SubHeader>{getGreeting(userName)}</SubHeader>
        </header>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <GlassCard>
            <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
          </GlassCard>

          <div>
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};