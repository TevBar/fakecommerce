// src/services/productService.ts

import { db } from "../firebase.config";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { Product } from '../../types/product';

// ✅ Fetch all products
export const getProducts = async () => {
  try {
    console.log("Fetching products from Firestore...");
    const querySnapshot = await getDocs(collection(db, "products"));

    if (querySnapshot.empty) {
      console.warn("Firestore: No products found.");
    }

    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched Products:", products);
    return products;
  } catch (error) {
    console.error("Firestore Fetch Error:", error);
    throw error;
  }
};

// ✅ Add a new product (auth required) — now returns the new product ID
export const addProduct = async (product: {
  name: string;
  price: number;
  stock: number;
  description: string;
}) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated. Please sign in to add a product.");

  try {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Product added with ID:", docRef.id);
    return docRef.id; // ✅ Added: Return the new product ID
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// ✅ Add a test product (auth required)
export const addTestProduct = async () => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated. Please sign in to add a test product.");

  try {
    console.log("Adding a test product to Firestore...");
    const docRef = await addDoc(collection(db, "products"), {
      name: "Sample Product",
      price: 25.99,
      stock: 5,
      description: "This is a sample product.",
    });
    console.log("Test product added successfully with ID:", docRef.id);
    return docRef.id; // Optional: Return test product ID too
  } catch (error) {
    console.error("Error adding test product:", error);
    throw error;
  }
};

// ✅ Update existing product (auth required)
export const updateProduct = async (
  productId: string,
  newData: Partial<{
    name: string;
    price: number;
    stock: number;
    description: string;
  }>
) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated. Please sign in to update a product.");

  try {
    await updateDoc(doc(db, "products", productId), newData);
    console.log(`Product ${productId} updated successfully!`);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// ✅ Delete product (auth required)
export const deleteProduct = async (productId: string) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated. Please sign in to delete a product.");

  try {
    await deleteDoc(doc(db, "products", productId));
    console.log(`Product ${productId} deleted successfully!`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
