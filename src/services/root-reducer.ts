import { combineReducers } from '@reduxjs/toolkit';
import {
  IngredientsSlice,
  BurgerConstructorSlice,
  OrdersSlice,
  UserSlice
} from '@slices';

export const RootReducer = combineReducers({
  ingredients: IngredientsSlice.reducer,
  'burger-constructor': BurgerConstructorSlice.reducer,
  orders: OrdersSlice.reducer,
  user: UserSlice.reducer
});
