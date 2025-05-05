// src/components/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import productReducer from "./productSlice"; // ✅ new



const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
products: productReducer // ✅ add here


export default store;


// command z once to get back to previous code and remove import and auth call at the bottom. 