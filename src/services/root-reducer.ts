import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredients-slice';

export const RootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer
});
