// src/components/store/reducers/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../cartSlice";   // ✅ Use default import
import authReducer from "../authSlice";   // ✅ Use default import


import { AnyAction } from "redux";

// Optional user reducer
const userReducer = (state = { user: null }, action: AnyAction) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  auth: authReducer,
});

export default rootReducer;
