// src/services/authService.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebase.config";
import { initializeUserProfile } from "./userService";

/**
 * Utility delay to allow Firebase auth state to update.
 * @param ms Milliseconds to wait
 */
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Registers a new user and initializes their Firestore profile.
 * @param email User email
 * @param password User password
 * @returns UserCredential
 */
export const registerUser = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // 🔄 Wait for Firebase Auth to populate currentUser
  await delay(200);

  // 🧾 Create user profile in Firestore if it doesn't exist
  await initializeUserProfile();

  return userCredential;
};

/**
 * Logs in an existing user and ensures their Firestore profile exists.
 * @param email User email
 * @param password User password
 * @returns UserCredential
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  // 🔄 Wait for Firebase Auth to populate currentUser
  await delay(200);

  // 🧾 Ensure Firestore user document exists
  await initializeUserProfile();

  return userCredential;
};

/**
 * Logs out the currently authenticated user.
 */
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};
