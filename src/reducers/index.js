// src/store/reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user-reducer';

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers as needed
});

export default rootReducer;
