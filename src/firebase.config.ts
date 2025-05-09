// src/firebase.config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getEnv } from "./utils/getEnv"; // 👈 NEW import

const firebaseConfig = getEnv(); // 👈 NEW usage

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
