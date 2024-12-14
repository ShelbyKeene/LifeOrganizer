import { useState, useCallback } from 'react';
import { Recipe, RecipeCategory } from '../types/meals';
import { generateId } from '../utils/idUtils';

export const useRecipeLibrary = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const addRecipe = useCallback((recipe: Omit<Recipe, 'id'>) => {
    setRecipes(prev => [...prev, { ...recipe, id: generateId() }]);
  }, []);

  const updateRecipe = useCallback((recipe: Recipe) => {
    setRecipes(prev => prev.map(r => r.id === recipe.id ? recipe : r));
  }, []);

  const deleteRecipe = useCallback((recipeId: string) => {
    setRecipes(prev => prev.filter(r => r.id !== recipeId));
  }, []);

  const getRecipesByCategory = useCallback((category: RecipeCategory | 'all') => {
    return category === 'all' 
      ? recipes 
      : recipes.filter(r => r.category === category);
  }, [recipes]);

  return {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipesByCategory,
  };
};