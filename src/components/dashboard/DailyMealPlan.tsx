import React from 'react';
import { Utensils } from 'lucide-react';
import { useRecipeLibrary } from '../../hooks/useRecipeLibrary';
import { Recipe } from '../../types/meals';

export const DailyMealPlan: React.FC = () => {
  const { recipes } = useRecipeLibrary();

  const getMealByType = (type: Recipe['category']) => {
    return recipes.find(recipe => recipe.category === type);
  };

  const mealTypes = [
    { type: 'breakfast' as const, label: 'Breakfast' },
    { type: 'lunch' as const, label: 'Lunch' },
    { type: 'dinner' as const, label: 'Dinner' },
    { type: 'snack' as const, label: 'Snacks' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-light flex items-center gap-2">
        <Utensils className="w-6 h-6" />
        Today's Meals
      </h3>

      <div className="space-y-4">
        {mealTypes.map(({ type, label }) => {
          const meal = getMealByType(type);
          
          return (
            <div key={type} className="space-y-2">
              <h4 className="opacity-70">{label}</h4>
              <div className="p-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors">
                {meal ? (
                  <div>
                    {meal.name}
                    <div className="text-sm opacity-70 mt-1">
                      {meal.prepTime + meal.cookTime} min
                    </div>
                  </div>
                ) : (
                  <div className="opacity-70">No {label.toLowerCase()} planned</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};