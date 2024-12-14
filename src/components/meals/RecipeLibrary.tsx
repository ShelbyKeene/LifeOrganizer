import React, { useState } from 'react';
import { Recipe, RecipeCategory } from '../../types/meals';
import { Search, Plus } from 'lucide-react';
import { RecipeCard } from './RecipeCard';
import { AddRecipeForm } from './AddRecipeForm';
import { useRecipeLibrary } from '../../hooks/useRecipeLibrary';

export const RecipeLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | 'all'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipesByCategory,
  } = useRecipeLibrary();

  const filteredRecipes = getRecipesByCategory(selectedCategory)
    .filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const handleAddRecipe = (recipe: Omit<Recipe, 'id'>) => {
    addRecipe(recipe);
    setShowAddForm(false);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    updateRecipe(recipe);
    setEditingRecipe(null);
  };

  const categories: { value: RecipeCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Recipes' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snacks' },
    { value: 'dessert', label: 'Desserts' },
    { value: 'drink', label: 'Drinks' },
  ];

  if (showAddForm || editingRecipe) {
    return (
      <AddRecipeForm
        onSubmit={editingRecipe ? handleEditRecipe : handleAddRecipe}
        onCancel={() => {
          setShowAddForm(false);
          setEditingRecipe(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Recipe</span>
        </button>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setSelectedCategory(value)}
            className={`
              px-4 py-2 rounded-lg whitespace-nowrap transition-all
              ${selectedCategory === value
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:bg-white/10'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={setEditingRecipe}
              onDelete={deleteRecipe}
            />
          ))
        ) : (
          <div className="md:col-span-2 h-48 rounded-lg bg-white/5 flex items-center justify-center text-white/50">
            No recipes found
          </div>
        )}
      </div>
    </div>
  );
};