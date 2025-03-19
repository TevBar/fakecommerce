// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the state
interface AuthState {
    token: string | null; // Token can be null initially or after logout
    isCartVisible: boolean; // Cart visibility state
}

// Set the initial state
const initialState: AuthState = {
    token: null, // Initial token is null
    isCartVisible: false, // Cart is hidden by default
};

// Create the slice with proper typing
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action for setting the auth token (can be string or null)
        setAuth: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        // Action for clearing the auth token (token is set to null)
        clearAuth: (state) => {
            state.token = null;
        },
        // Action for toggling the cart visibility
        toggleCart: (state) => {
            state.isCartVisible = !state.isCartVisible;
        },
    },
});

// Export actions to use in components
export const { setAuth, clearAuth, toggleCart } = authSlice.actions;

// Export the reducer to configure the store
export const authReducer = authSlice.reducer;
