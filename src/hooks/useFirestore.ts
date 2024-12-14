import { useState, useCallback } from 'react';
import { db } from '../config/firebase';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export function useFirestore<T extends { id: string }>(collectionName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { currentUser } = useAuth();

  const getCollectionRef = useCallback(() => {
    if (!currentUser) throw new Error('No authenticated user');
    return collection(db, `users/${currentUser.uid}/${collectionName}`);
  }, [currentUser, collectionName]);

  const add = useCallback(async (data: T) => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      setError(null);
      const docRef = doc(getCollectionRef(), data.id);
      await setDoc(docRef, { ...data, userId: currentUser.uid });
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser, getCollectionRef]);

  const remove = useCallback(async (id: string) => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      setError(null);
      const docRef = doc(getCollectionRef(), id);
      await deleteDoc(docRef);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser, getCollectionRef]);

  const list = useCallback(async (): Promise<T[]> => {
    if (!currentUser) return [];
    
    try {
      setLoading(true);
      setError(null);
      const q = query(getCollectionRef(), where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as T);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser, getCollectionRef]);

  return {
    add,
    remove,
    list,
    loading,
    error
  };
}