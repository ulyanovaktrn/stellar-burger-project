import { describe, test, expect } from '@jest/globals';
import { feedMock } from '../mock-data/feed';
import { TOrdersSliceState } from './slice';
import { OrdersSlice, OrdersActions, ordersInitialState } from '.';

describe('OrdersSlice: тесты редьюсеров', () => {
  const initialState: TOrdersSliceState = {
    ...ordersInitialState,
    previewOrder: feedMock.orders[0]
  };
  const error = new Error('test error');
  const blankError = new Error('');
  const previewOrder = feedMock.orders[1];
  const newOrder = feedMock.orders[2];

  test('[#1] получение заказа по номеру (pending)', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      isLoading: true,
      previewOrder: null
    };

    const newState = OrdersSlice.reducer(
      { ...initialState, error: error.message },
      OrdersActions.getOrderByNumberThunk.pending('', previewOrder.number)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#2] получение заказа по номеру (rejected with err)', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = OrdersSlice.reducer(
      { ...initialState, isLoading: true },
      OrdersActions.getOrderByNumberThunk.rejected(
        error,
        '',
        previewOrder.number
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#3] получения заказа по номеру (rejected without err)', () => {
    const expectedState: TOrdersSliceState = initialState;

    const newState = OrdersSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      OrdersActions.getOrderByNumberThunk.rejected(
        blankError,
        '',
        previewOrder.number
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#4] получениt заказа по номеру (fulfilled)', () => {
    const expectedState: TOrdersSliceState = { ...initialState, previewOrder };

    const newState = OrdersSlice.reducer(
      { ...initialState, isLoading: true },
      OrdersActions.getOrderByNumberThunk.fulfilled(
        { orders: [previewOrder] },
        '',
        previewOrder.number
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#5] отправка заказа (pending)', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      isLoading: true
    };

    const newState = OrdersSlice.reducer(
      { ...initialState, error: error.message },
      OrdersActions.getOrderBurgerThunk.pending('', newOrder.ingredients)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#6] отправка заказа (rejected with err)', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = OrdersSlice.reducer(
      { ...initialState, isLoading: true },
      OrdersActions.getOrderBurgerThunk.rejected(
        error,
        '',
        newOrder.ingredients
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#7] отправка заказа (rejected without err)', () => {
    const expectedState: TOrdersSliceState = initialState;

    const newState = OrdersSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      OrdersActions.getOrderBurgerThunk.rejected(
        blankError,
        '',
        newOrder.ingredients
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#8] отправка заказа (fulfilled)', () => {
    const expectedState: TOrdersSliceState = { ...initialState, newOrder };

    const newState = OrdersSlice.reducer(
      { ...initialState, isLoading: true },
      OrdersActions.getOrderBurgerThunk.fulfilled(
        { order: newOrder },
        '',
        newOrder.ingredients
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#9] очистка после оформления', () => {
    const expectedState: TOrdersSliceState = initialState;

    const newState = OrdersSlice.reducer(
      { ...initialState, newOrder },
      OrdersActions.clearNewOrder()
    );

    expect(newState).toEqual(expectedState);
  });
});