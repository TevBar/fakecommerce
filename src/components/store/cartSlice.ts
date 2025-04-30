// src/store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSessionCart, saveSessionCart } from "../../utils/sessionStorageUtils";
import { toast } from "sonner";

export interface CartProduct {
  key: string;
  name: string;
  price: number;
  quantity: number;
}

const initialState: CartProduct[] = getSessionCart();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartProduct>) {
      const existingProduct = state.find(p => p.key === action.payload.key);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.push({ ...action.payload, quantity: action.payload.quantity ?? 1 });
      }
      saveSessionCart(state);
      toast.success("Product added successfully!", { position: "bottom-right" });
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const next = state.filter(item => item.key !== action.payload);
      saveSessionCart(next);
      toast.warning("Product removed successfully!", { position: "bottom-right" });
      return next;
    },

    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.find(p => p.key === action.payload);
      if (item) {
        item.quantity += 1;
        saveSessionCart(state);
      }
    },

    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.find(p => p.key === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveSessionCart(state);
      }
    },

    // ← New reducer to clear the entire cart
    clearCart() {
      saveSessionCart([]);   // wipe sessionStorage
      return [];             // reset Redux state
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,    // ← make sure to export it
} = cartSlice.actions;

export default cartSlice.reducer;
