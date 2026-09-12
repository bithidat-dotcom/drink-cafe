import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD9FxCHyk-l8QUQ-2Rzbif-XjYWGC5cRog",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "genial-inn-2h7sp.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "genial-inn-2h7sp",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "genial-inn-2h7sp.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "295815579779",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:295815579779:web:585000cb89c55959cc33b6"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore with specific database ID if provided
const databaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID || "ai-studio-drinkcafe-1ab5f46e-f397-49d5-95ad-c4c553bbb63b";
let db;

try {
  if (databaseId && databaseId !== '(default)') {
    db = initializeFirestore(app, {}, databaseId);
  } else {
    db = getFirestore(app);
  }
} catch (error) {
  db = getFirestore(app);
}

const auth = getAuth(app);

export { app, db, auth };
