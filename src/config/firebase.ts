import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB3nL7PBjAJaa07GVrKTEJ4sJ9f3yRWWNs",
  authDomain: "life-organizer-a49e3.firebaseapp.com",
  projectId: "life-organizer-a49e3",
  storageBucket: "life-organizer-a49e3.firebasestorage.app",
  messagingSenderId: "967684581566",
  appId: "1:967684581566:web:ea49f54c4fe6f86e21d6ef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);