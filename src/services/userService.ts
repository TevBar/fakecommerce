// src/services/userService.ts
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export interface UserProfile {
  uid: string;
  email: string;
  name?: string;
  address?: string;
}

/**
 * Fetches the authenticated user's profile from Firestore.
 * @returns UserProfile | null
 */
export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const auth = getAuth();
    if (!auth.currentUser) throw new Error("User not authenticated");

    const uid = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, "users", uid));

    if (!userDoc.exists()) {
      console.warn("🚨 User profile not found in Firestore:", uid);
      return null;
    }

    const data = userDoc.data() as Omit<UserProfile, "uid">;
    return {
      uid,
      email: data.email,
      name: data.name,
      address: data.address,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

/**
 * Creates or updates the authenticated user's profile in Firestore.
 * @param user Partial<UserProfile> (fields to update)
 */
export const saveUserProfile = async (user: Partial<UserProfile>): Promise<void> => {
  try {
    const auth = getAuth();
    if (!auth.currentUser) throw new Error("User not authenticated");

    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, { uid, ...user }, { merge: true });
    console.log("✅ User profile saved successfully.");
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
};

/**
 * Initializes the authenticated user's profile in Firestore
 * if it doesn't already exist.
 */
export const initializeUserProfile = async (): Promise<void> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.warn("⚠️ No authenticated user found.");
      return;
    }

    const uid = user.uid;
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid,
        email: user.email,
        name: "",
        address: "",
      });
      console.log("✅ New user profile initialized.");
    } else {
      console.log("ℹ️ User profile already exists.");
    }
  } catch (error) {
    console.error("Error initializing user profile:", error);
  }
};

/**
 * Gets the authenticated user's profile, or creates one if not found.
 * A tiny wait is added after login to avoid race conditions.
 * @returns UserProfile | null
 */
export const getOrInitializeUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const auth = getAuth();
    if (!auth.currentUser) throw new Error("User not authenticated");

    // Wait briefly to ensure auth.currentUser is fully updated (avoid race conditions)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    // Create profile if it doesn't exist
    if (!userSnap.exists()) {
      console.log("📄 No user profile found, creating one...");
      await setDoc(userRef, {
        uid,
        email: auth.currentUser.email,
        name: "",
        address: "",
      });
    }

    const finalSnap = await getDoc(userRef);
    const data = finalSnap.data() as Omit<UserProfile, "uid">;
    return {
      uid,
      email: data.email,
      name: data.name,
      address: data.address,
    };
  } catch (error) {
    console.error("Error getting or initializing user profile:", error);
    return null;
  }
};

/**
 * Updates the authenticated user's profile details.
 * @param data Partial<UserProfile> (fields to update)
 */
export const updateUserProfile = async (data: Partial<UserProfile>): Promise<void> => {
  try {
    const auth = getAuth();
    if (!auth.currentUser) throw new Error("User not authenticated");

    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
    console.log("✅ User profile updated successfully.");
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

/**
 * Deletes the authenticated user's profile from Firestore.
 */
export const deleteUserProfile = async (): Promise<void> => {
  try {
    const auth = getAuth();
    if (!auth.currentUser) throw new Error("User not authenticated");

    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);
    await deleteDoc(userRef);
    console.log("🗑️ User profile deleted successfully.");
  } catch (error) {
    console.error("Error deleting user profile:", error);
  }
};
