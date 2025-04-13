// src/store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Define the shape of a product in the cart
export interface CartProduct {
  key: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the shape of the state (an array of products)
export type CartState = CartProduct[];

// Initial state
const initialState: CartState = [];

// Create the slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartProduct>) {
      const existingProduct = state.find(product => product.key === action.payload.key);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      toast.success("Product added successfully!", {
        position: "bottom-right",
      });
    },
    removeFromCart(state, action: PayloadAction<string>) {
      toast.warning("Product removed successfully!", {
        position: "bottom-right",
      });
      return state.filter(item => item.key !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.find(product => product.key === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.find(product => product.key === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

// ✅ Default export reducer
export default cartSlice.reducer;
