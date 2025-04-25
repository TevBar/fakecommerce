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
      const existingProduct = state.find(product => product.key === action.payload.key);
      if (existingProduct) {
        // ✅ Increase by the quantity in the payload, not just +1
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.push({ ...action.payload });
      }
      saveSessionCart(state); // 🔁 Persist
      toast.success("Product added successfully!", {
        position: "bottom-right",
      });
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const newState = state.filter(item => item.key !== action.payload);
      saveSessionCart(newState);
      toast.warning("Product removed successfully!", {
        position: "bottom-right",
      });
      return newState;
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.find(product => product.key === action.payload);
      if (item) {
        item.quantity += 1;
      }
      saveSessionCart(state);
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.find(product => product.key === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveSessionCart(state);
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
