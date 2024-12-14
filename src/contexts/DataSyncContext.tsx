import React, { createContext, useContext, useEffect } from 'react';
import { syncManager } from '../utils/syncManager';
import { useAuth } from './AuthContext';

interface DataSyncContextType {
  syncTasks: () => void;
  syncRecipes: () => void;
  syncMealPlans: () => void;
  syncEvents: () => void;
  syncHealthMetrics: () => void;
  syncHealthGoals: () => void;
  syncExercises: () => void;
  syncHabits: () => void;
}

const DataSyncContext = createContext<DataSyncContextType | null>(null);

export const useDataSync = () => {
  const context = useContext(DataSyncContext);
  if (!context) {
    throw new Error('useDataSync must be used within a DataSyncProvider');
  }
  return context;
};

export const DataSyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  useEffect(() => {
    syncManager.initialize(currentUser);
  }, [currentUser]);

  const value = {
    syncTasks: () => syncManager.syncTasks(),
    syncRecipes: () => syncManager.syncRecipes(),
    syncMealPlans: () => syncManager.syncMealPlans(),
    syncEvents: () => syncManager.syncEvents(),
    syncHealthMetrics: () => syncManager.syncHealthMetrics(),
    syncHealthGoals: () => syncManager.syncHealthGoals(),
    syncExercises: () => syncManager.syncExercises(),
    syncHabits: () => syncManager.syncHabits(),
  };

  return (
    <DataSyncContext.Provider value={value}>
      {children}
    </DataSyncContext.Provider>
  );
};