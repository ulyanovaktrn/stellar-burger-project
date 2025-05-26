import { RootState } from './store';
import {
  IngredientsSlice,
  BurgerConstructorSlice,
  OrdersSlice,
  UserSlice,
  UserOrdersSlice,
  FeedSlice
} from '@slices';

export const IngredientsSelectors = IngredientsSlice.selectors;
export const BurgerConstructorSelectors = BurgerConstructorSlice.selectors;
export const UserSelectors = UserSlice.selectors;
export const UserOrdersSelectors = UserOrdersSlice.selectors;
export const OrdersSelectors = OrdersSlice.selectors;
export const OrderInfoSelector = (number: string) => (state: RootState) => {
  if (state['feed-orders'].orders.length) {
    const order = state['feed-orders'].orders.find(
      (order) => order.number === Number(number)
    );
    if (order) return order;
  }
  if (state['user-orders'].orders.length) {
    const order = state['user-orders'].orders.find(
      (order) => order.number === Number(number)
    );

    if (order) return order;
  }
  if (state.orders.previewOrder?.number === Number(number)) {
    return state.orders.previewOrder;
  }
  return null;
};

export const FeedSelectors = FeedSlice.selectors;
