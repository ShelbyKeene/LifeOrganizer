import React from 'react';
import { SectionHeader } from '../Typography';
import { GlassCard } from '../GlassCard';
import { WeatherWidget } from './WeatherWidget';
import { DailyMealPlan } from './DailyMealPlan';
import { DailyEvents } from './DailyEvents';
import { DailyQuote } from './DailyQuote';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <SectionHeader>Dashboard</SectionHeader>
      
      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard>
          <WeatherWidget />
        </GlassCard>

        <GlassCard>
          <DailyQuote />
        </GlassCard>

        <GlassCard>
          <DailyMealPlan />
        </GlassCard>

        <GlassCard>
          <DailyEvents />
        </GlassCard>
      </div>
    </div>
  );
};