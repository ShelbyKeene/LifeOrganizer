import React, { useState } from 'react';
import { GroceryItem } from '../../types/meals';
import { Check, Circle, Plus, Trash2 } from 'lucide-react';
import { useGroceryList } from '../../hooks/useGroceryList';

export const GroceryList: React.FC = () => {
  const {
    items,
    addItem,
    toggleItem,
    removeItem,
    clearChecked,
    getItemsByCategory,
  } = useGroceryList();

  const [newItem, setNewItem] = useState({
    name: '',
    amount: '',
    unit: '',
    category: 'produce' as GroceryItem['category'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    addItem({
      name: newItem.name.trim(),
      amount: Number(newItem.amount) || 1,
      unit: newItem.unit,
      category: newItem.category,
    });

    setNewItem({
      name: '',
      amount: '',
      unit: '',
      category: 'produce',
    });
  };

  const itemsByCategory = getItemsByCategory();
  const categories = [
    { id: 'produce', label: 'Produce' },
    { id: 'dairy', label: 'Dairy' },
    { id: 'meat', label: 'Meat' },
    { id: 'pantry', label: 'Pantry' },
    { id: 'other', label: 'Other' },
  ];

  const hasCheckedItems = items.some(item => item.checked);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Item name"
            className="col-span-2 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
          <input
            type="number"
            value={newItem.amount}
            onChange={(e) => setNewItem(prev => ({ ...prev, amount: e.target.value }))}
            placeholder="Amount"
            className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
          <input
            type="text"
            value={newItem.unit}
            onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
            placeholder="Unit"
            className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={newItem.category}
            onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value as GroceryItem['category'] }))}
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          >
            {categories.map(({ id, label }) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </div>
      </form>

      {hasCheckedItems && (
        <div className="flex justify-end">
          <button
            onClick={clearChecked}
            className="text-white/70 hover:text-white transition-colors flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear checked items</span>
          </button>
        </div>
      )}

      <div className="space-y-6">
        {categories.map(({ id, label }) => {
          const categoryItems = itemsByCategory[id as GroceryItem['category']] || [];
          if (categoryItems.length === 0) return null;

          return (
            <div key={id} className="space-y-2">
              <h3 className="text-lg font-light text-white">{label}</h3>
              <div className="space-y-2">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        {item.checked ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                      <span className={`
                        text-white transition-colors
                        ${item.checked ? 'line-through text-white/50' : ''}
                      `}>
                        {item.name}
                        {item.amount > 1 && (
                          <span className="text-white/70">
                            {' '}({item.amount} {item.unit})
                          </span>
                        )}
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-white/30 hover:text-white/70 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};