// src/components/store/reducers/index.ts
import { combineReducers } from 'redux';

// Example of a simple reducer, you can add more as you grow your app
import { AnyAction } from 'redux';

const userReducer = (state = { user: null }, action: AnyAction) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// Combine your reducers (add more if you have more state slices)
const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
