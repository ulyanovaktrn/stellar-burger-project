import { configureStore } from '@reduxjs/toolkit';
import { describe, test, expect } from '@jest/globals';
import { RootReducer } from './root-reducer';
import {
    burgerConstructorInitialState,
    feedInitialState,
    ingredientsInitialState,
    ordersInitialState,
    userInitialState,
    userOrdersInitialState
} from '@slices';

describe('RootReducer: тест инициализации', () => {
  test('начальное состояния хранилища', () => {
    const expectedInitialState = {
      ingredients: ingredientsInitialState,
      'burger-constructor': burgerConstructorInitialState,
      orders: ordersInitialState,
      user: userInitialState,
      'user-orders': userOrdersInitialState,
      'feed-orders': feedInitialState
    };
    const store = configureStore({ reducer: RootReducer });
    const expectedStoreInitialState = store.getState();

    const initialState = RootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual(expectedInitialState);
    expect(initialState).toEqual(expectedStoreInitialState);
  });
});