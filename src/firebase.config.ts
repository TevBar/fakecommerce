// src/firebase.config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_APIKEY || import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: process.env.VITE_AUTH_DOMAIN || import.meta.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID || import.meta.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET || import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MSG_SENDERID || import.meta.env.VITE_MSG_SENDERID,
  appId: process.env.VITE_APP_ID || import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
