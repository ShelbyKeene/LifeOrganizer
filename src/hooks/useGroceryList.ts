import { useState, useCallback } from 'react';
import { GroceryItem } from '../types/meals';
import { generateId } from '../utils/idUtils';

export const useGroceryList = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);

  const addItem = useCallback((item: Omit<GroceryItem, 'id' | 'checked'>) => {
    setItems(prev => [...prev, { ...item, id: generateId(), checked: false }]);
  }, []);

  const toggleItem = useCallback((itemId: string) => {
    setItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    ));
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const clearChecked = useCallback(() => {
    setItems(prev => prev.filter(item => !item.checked));
  }, []);

  const getItemsByCategory = useCallback(() => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<GroceryItem['category'], GroceryItem[]>);
  }, [items]);

  return {
    items,
    addItem,
    toggleItem,
    removeItem,
    clearChecked,
    getItemsByCategory,
  };
};