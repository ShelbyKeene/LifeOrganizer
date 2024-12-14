import { useState, useEffect, useCallback } from 'react';
import { useFirestore } from './useFirestore';
import { useLocalStorage } from './useLocalStorage';
import { useAuth } from '../contexts/AuthContext';

export function useSyncedState<T extends { id: string }>(
  key: string,
  initialState: T[]
) {
  const [localData, setLocalData] = useLocalStorage<T[]>(key, initialState);
  const [syncedData, setSyncedData] = useState<T[]>(localData);
  const { currentUser } = useAuth();
  const { add, remove, list } = useFirestore<T>(key);

  // Sync with Firestore when user logs in
  useEffect(() => {
    if (currentUser) {
      list().then(data => {
        setSyncedData(data);
        setLocalData(data);
      });
    }
  }, [currentUser]);

  const addItem = useCallback(async (item: T) => {
    // Update local state immediately
    const newData = [...syncedData, item];
    setSyncedData(newData);
    setLocalData(newData);

    // Sync with Firestore if user is authenticated
    if (currentUser) {
      try {
        await add(item);
      } catch (error) {
        // Rollback on error
        setSyncedData(syncedData);
        setLocalData(syncedData);
        throw error;
      }
    }
  }, [syncedData, currentUser, add, setLocalData]);

  const removeItem = useCallback(async (id: string) => {
    // Update local state immediately
    const newData = syncedData.filter(item => item.id !== id);
    setSyncedData(newData);
    setLocalData(newData);

    // Sync with Firestore if user is authenticated
    if (currentUser) {
      try {
        await remove(id);
      } catch (error) {
        // Rollback on error
        setSyncedData(syncedData);
        setLocalData(syncedData);
        throw error;
      }
    }
  }, [syncedData, currentUser, remove, setLocalData]);

  const updateItem = useCallback(async (updatedItem: T) => {
    // Update local state immediately
    const newData = syncedData.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    setSyncedData(newData);
    setLocalData(newData);

    // Sync with Firestore if user is authenticated
    if (currentUser) {
      try {
        await add(updatedItem); // Using add since it uses setDoc which can update
      } catch (error) {
        // Rollback on error
        setSyncedData(syncedData);
        setLocalData(syncedData);
        throw error;
      }
    }
  }, [syncedData, currentUser, add, setLocalData]);

  return {
    data: syncedData,
    addItem,
    removeItem,
    updateItem
  };
}