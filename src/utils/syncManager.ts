import { firestoreDB } from './firestore';
import { storage } from './storage';
import { auth } from '../config/firebase';
import { User } from 'firebase/auth';

class SyncManager {
  private user: User | null = null;
  private syncTimeout: NodeJS.Timeout | null = null;
  private pendingChanges: Set<string> = new Set();

  initialize(user: User | null) {
    this.user = user;
    if (user) {
      this.syncFromFirestore();
    }
  }

  private async syncFromFirestore() {
    if (!this.user) return;

    try {
      // Sync all data types from Firestore
      const collections = [
        'tasks',
        'recipes',
        'mealPlans',
        'events',
        'healthMetrics',
        'healthGoals',
        'exercises',
        'habits'
      ];

      for (const collection of collections) {
        const data = await firestoreDB.list(collection, this.user.uid);
        if (data) {
          storage[collection].save(data);
        }
      }
    } catch (error) {
      console.error('Error syncing from Firestore:', error);
    }
  }

  private scheduleSyncToFirestore(collection: string) {
    this.pendingChanges.add(collection);

    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
    }

    this.syncTimeout = setTimeout(() => {
      this.performSync();
    }, 2000); // Debounce sync operations
  }

  private async performSync() {
    if (!this.user || this.pendingChanges.size === 0) return;

    try {
      const syncPromises = Array.from(this.pendingChanges).map(async (collection) => {
        const data = storage[collection].load();
        await firestoreDB.batchSync(collection, this.user!.uid, data);
      });

      await Promise.all(syncPromises);
      this.pendingChanges.clear();
    } catch (error) {
      console.error('Error syncing to Firestore:', error);
    }
  }

  // Public methods for different data types
  syncTasks() {
    this.scheduleSyncToFirestore('tasks');
  }

  syncRecipes() {
    this.scheduleSyncToFirestore('recipes');
  }

  syncMealPlans() {
    this.scheduleSyncToFirestore('mealPlans');
  }

  syncEvents() {
    this.scheduleSyncToFirestore('events');
  }

  syncHealthMetrics() {
    this.scheduleSyncToFirestore('healthMetrics');
  }

  syncHealthGoals() {
    this.scheduleSyncToFirestore('healthGoals');
  }

  syncExercises() {
    this.scheduleSyncToFirestore('exercises');
  }

  syncHabits() {
    this.scheduleSyncToFirestore('habits');
  }
}

export const syncManager = new SyncManager();