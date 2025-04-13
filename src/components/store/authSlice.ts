// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define state shape
interface AuthState {
  token: string | null;
  isCartVisible: boolean;
}

// Initial state
const initialState: AuthState = {
  token: null,
  isCartVisible: false,
};

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
    },
    toggleCart: (state) => {
      state.isCartVisible = !state.isCartVisible;
    },
  },
});

// Export actions
export const { setAuth, clearAuth, toggleCart } = authSlice.actions;

// ✅ Default export reducer
export default authSlice.reducer;
