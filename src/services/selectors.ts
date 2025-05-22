import { RootState } from './store';
import {
  IngredientsSlice,
  BurgerConstructorSlice,
  OrdersSlice,
  UserSlice,
  FeedSlice
} from '@slices';

export const IngredientsSelectors = IngredientsSlice.selectors;
export const BurgerConstructorSelectors = BurgerConstructorSlice.selectors;
export const OrdersSelectors = OrdersSlice.selectors;
export const UserSelectors = UserSlice.selectors;
export const FeedSelectors = FeedSlice.selectors;
