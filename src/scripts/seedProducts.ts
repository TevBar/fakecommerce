// src/scripts/seedProducts.ts

import { addProduct } from "../services/productService";

const FAKE_API_URL = "https://fakestoreapi.com/products";

export const seedProductsToFirestore = async () => {
  try {
    const response = await fetch(FAKE_API_URL);
    const products = await response.json();

    for (const item of products) {
      const newProduct = {
        name: item.title,
        price: item.price,
        stock: Math.floor(Math.random() * 20) + 1, // random stock
        description: item.description,
      };

      const id = await addProduct(newProduct);
      console.log(`✅ Added product ${newProduct.name} with ID: ${id}`);
    }

    console.log("🔥 Seeding complete.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
};
