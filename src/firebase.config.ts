import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Add Firestore

// const firebaseConfig = {
//   apiKey: process.env.VITE_FIREBASE_APIKEY,
//   authDomain: process.env.VITE_AUTH_DOMAIN,
//   projectId: process.env.VITE_PROJECT_ID,
//   storageBucket: process.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VITE_MSG_SENDERID,
//   appId: process.env.VITE_APP_ID
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MSG_SENDERID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  // Export Firestore
export default app;
