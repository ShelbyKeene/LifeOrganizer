import { useState, useCallback } from 'react';
import { MealPlan, Recipe } from '../types/meals';
import { generateId } from '../utils/idUtils';

export const useMealPlanner = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);

  const addMealToPlan = useCallback((date: Date, mealType: keyof MealPlan['meals'], recipe: Recipe) => {
    setMealPlans(prev => {
      const existingPlan = prev.find(plan => 
        plan.date.toDateString() === date.toDateString()
      );

      if (existingPlan) {
        return prev.map(plan => 
          plan.id === existingPlan.id
            ? {
                ...plan,
                meals: {
                  ...plan.meals,
                  [mealType]: mealType === 'snacks'
                    ? [...(plan.meals.snacks || []), recipe]
                    : recipe
                }
              }
            : plan
        );
      }

      return [...prev, {
        id: generateId(),
        date,
        meals: {
          snacks: [],
          [mealType]: mealType === 'snacks' ? [recipe] : recipe
        }
      }];
    });
  }, []);

  const removeMealFromPlan = useCallback((planId: string, mealType: keyof MealPlan['meals'], recipeId?: string) => {
    setMealPlans(prev => prev.map(plan => 
      plan.id === planId
        ? {
            ...plan,
            meals: {
              ...plan.meals,
              [mealType]: mealType === 'snacks' && recipeId
                ? plan.meals.snacks.filter(recipe => recipe.id !== recipeId)
                : undefined
            }
          }
        : plan
    ));
  }, []);

  return {
    mealPlans,
    addMealToPlan,
    removeMealFromPlan,
  };
};