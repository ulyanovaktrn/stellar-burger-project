import { describe, test, expect } from '@jest/globals';
import { feedMock } from '../mock-data/feed';
import { TUserOrdersSliceState } from './slice';
import { UserOrdersSlice, UserOrdersActions, userOrdersInitialState } from '.';

describe('UserOrdersSlice: тесты редьюсеров', () => {
  const initialState: TUserOrdersSliceState = userOrdersInitialState;
  const error = new Error('test error');

  test('[#1] получение истории заказов (pending)', () => {
    const expectedState: TUserOrdersSliceState = {
      ...initialState,
      isLoading: true
    };

    const newState = UserOrdersSlice.reducer(
      { ...initialState, error: error.message },
      UserOrdersActions.getOrdersThunk.pending('')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#2] получение истории заказов (rejected with err)', () => {
    const expectedState: TUserOrdersSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = UserOrdersSlice.reducer(
      { ...initialState, isLoading: true },
      UserOrdersActions.getOrdersThunk.rejected(error, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#3] получение истории заказов (rejected without err)', () => {
    const expectedState: TUserOrdersSliceState = initialState;

    const newState = UserOrdersSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      UserOrdersActions.getOrdersThunk.rejected(new Error(''), '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#4] получение истории заказов (fulfilled)', () => {
    const expectedState: TUserOrdersSliceState = {
      ...initialState,
      orders: feedMock.orders
    };

    const newState = UserOrdersSlice.reducer(
      { ...initialState, isLoading: true },
      UserOrdersActions.getOrdersThunk.fulfilled(feedMock.orders, '')
    );

    expect(newState).toEqual(expectedState);
  });
});