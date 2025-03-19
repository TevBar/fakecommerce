// src/components/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Ensure this path is correct

const store = configureStore({
  reducer: rootReducer,
});

// ✅ Export RootState and AppDispatch for correct type usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
