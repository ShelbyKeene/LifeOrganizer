import React, { useState } from 'react';
import { Recipe, RecipeCategory, Ingredient } from '../../types/meals';
import { Plus, Minus } from 'lucide-react';

interface AddRecipeFormProps {
  onSubmit: (recipe: Omit<Recipe, 'id'>) => void;
  onCancel: () => void;
}

export const AddRecipeForm: React.FC<AddRecipeFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [recipe, setRecipe] = useState<Omit<Recipe, 'id'>>({
    name: '',
    category: 'dinner',
    ingredients: [{ name: '', amount: 0, unit: '' }],
    instructions: [''],
    prepTime: 0,
    cookTime: 0,
    servings: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipe.name || recipe.ingredients.some(i => !i.name)) return;
    onSubmit(recipe);
  };

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: 0, unit: '' }],
    }));
  };

  const removeIngredient = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) =>
        i === index ? { ...ing, [field]: value } : ing
      ),
    }));
  };

  const addInstruction = () => {
    setRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, ''],
    }));
  };

  const removeInstruction = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }));
  };

  const updateInstruction = (index: number, value: string) => {
    setRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) =>
        i === index ? value : inst
      ),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-white/90 mb-2 font-light">Recipe Name</label>
          <input
            type="text"
            value={recipe.name}
            onChange={(e) => setRecipe(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
            placeholder="Enter recipe name..."
          />
        </div>

        <div>
          <label className="block text-white/90 mb-2 font-light">Category</label>
          <select
            value={recipe.category}
            onChange={(e) => setRecipe(prev => ({ ...prev, category: e.target.value as RecipeCategory }))}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-white/90 mb-2 font-light">Prep Time (min)</label>
            <input
              type="number"
              value={recipe.prepTime}
              onChange={(e) => setRecipe(prev => ({ ...prev, prepTime: Number(e.target.value) }))}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white/90 mb-2 font-light">Cook Time (min)</label>
            <input
              type="number"
              value={recipe.cookTime}
              onChange={(e) => setRecipe(prev => ({ ...prev, cookTime: Number(e.target.value) }))}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white/90 mb-2 font-light">Servings</label>
            <input
              type="number"
              value={recipe.servings}
              onChange={(e) => setRecipe(prev => ({ ...prev, servings: Number(e.target.value) }))}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-white/90 mb-2 font-light">Image URL (optional)</label>
          <input
            type="url"
            value={recipe.imageUrl || ''}
            onChange={(e) => setRecipe(prev => ({ ...prev, imageUrl: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
            placeholder="Enter image URL..."
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-white/90 font-light">Ingredients</label>
            <button
              type="button"
              onClick={addIngredient}
              className="text-white/70 hover:text-white transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                placeholder="Ingredient name"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
              />
              <input
                type="number"
                value={ingredient.amount}
                onChange={(e) => updateIngredient(index, 'amount', Number(e.target.value))}
                placeholder="Amount"
                className="w-24 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
              />
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                placeholder="Unit"
                className="w-24 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-white/50 hover:text-white/70 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-white/90 font-light">Instructions</label>
            <button
              type="button"
              onClick={addInstruction}
              className="text-white/70 hover:text-white transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-white/50">{index + 1}.</span>
              <input
                type="text"
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                placeholder="Enter instruction step..."
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="text-white/50 hover:text-white/70 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
        >
          Save Recipe
        </button>
      </div>
    </form>
  );
};