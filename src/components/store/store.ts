// src/components/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Ensure this path is correct
import type { AuthState } from "../store/authSlice";
// import right above can be removed if it does not work during testing.


const store = configureStore({
  reducer: rootReducer,
});

// ✅ Export RootState and AppDispatch for correct type usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type _FixTSExportError = AuthState;

export default store;
