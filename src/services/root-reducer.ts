import { combineReducers } from '@reduxjs/toolkit';
import {
  IngredientsSlice,
  BurgerConstructorSlice,
  OrdersSlice,
  UserSlice,
  FeedSlice
} from '@slices';

export const RootReducer = combineReducers({
  ingredients: IngredientsSlice.reducer,
  'burger-constructor': BurgerConstructorSlice.reducer,
  orders: OrdersSlice.reducer,
  user: UserSlice.reducer,
  'feed-orders': FeedSlice.reducer
});
