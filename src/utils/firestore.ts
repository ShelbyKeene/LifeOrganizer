import { 
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const firestoreDB = {
  // Generic CRUD operations
  create: async <T extends { id: string }>(
    collectionName: string,
    userId: string,
    data: T
  ): Promise<void> => {
    await setDoc(doc(db, `users/${userId}/${collectionName}`, data.id), data);
  },

  read: async <T>(
    collectionName: string,
    userId: string,
    documentId: string
  ): Promise<T | null> => {
    const docRef = doc(db, `users/${userId}/${collectionName}`, documentId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as T : null;
  },

  update: async <T>(
    collectionName: string,
    userId: string,
    documentId: string,
    data: Partial<T>
  ): Promise<void> => {
    const docRef = doc(db, `users/${userId}/${collectionName}`, documentId);
    await updateDoc(docRef, data as any);
  },

  delete: async (
    collectionName: string,
    userId: string,
    documentId: string
  ): Promise<void> => {
    await deleteDoc(doc(db, `users/${userId}/${collectionName}`, documentId));
  },

  list: async <T>(
    collectionName: string,
    userId: string
  ): Promise<T[]> => {
    const q = query(
      collection(db, `users/${userId}/${collectionName}`),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as T);
  },

  // Batch operations for syncing
  batchSync: async <T extends { id: string }>(
    collectionName: string,
    userId: string,
    items: T[]
  ): Promise<void> => {
    const promises = items.map(item => 
      setDoc(doc(db, `users/${userId}/${collectionName}`, item.id), item)
    );
    await Promise.all(promises);
  }
};