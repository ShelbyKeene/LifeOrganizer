import React, { useState } from 'react';
import { SectionHeader } from '../Typography';
import { GlassCard } from '../GlassCard';
import { MealPlanner } from './MealPlanner';
import { RecipeLibrary } from './RecipeLibrary';
import { GroceryList } from './GroceryList';
import { TabButton } from './TabButton';

export const MealSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'planner' | 'recipes' | 'grocery'>('planner');

  return (
    <div className="space-y-6">
      <SectionHeader>Meal Planning</SectionHeader>

      <div className="flex space-x-4 mb-6">
        <TabButton
          active={activeTab === 'planner'}
          onClick={() => setActiveTab('planner')}
        >
          Meal Planner
        </TabButton>
        <TabButton
          active={activeTab === 'recipes'}
          onClick={() => setActiveTab('recipes')}
        >
          Recipe Library
        </TabButton>
        <TabButton
          active={activeTab === 'grocery'}
          onClick={() => setActiveTab('grocery')}
        >
          Grocery List
        </TabButton>
      </div>

      <GlassCard>
        {activeTab === 'planner' && <MealPlanner />}
        {activeTab === 'recipes' && <RecipeLibrary />}
        {activeTab === 'grocery' && <GroceryList />}
      </GlassCard>
    </div>
  );
};