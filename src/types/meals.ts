export interface Recipe {
  id: string;
  name: string;
  category: RecipeCategory;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  imageUrl?: string;
}

export type RecipeCategory = 
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snack'
  | 'dessert'
  | 'drink';

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface MealPlan {
  id: string;
  date: Date;
  meals: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
    snacks: Recipe[];
  };
}

export interface GroceryItem {
  name: string;
  amount: number;
  unit: string;
  checked: boolean;
  category: 'produce' | 'dairy' | 'meat' | 'pantry' | 'other';
}