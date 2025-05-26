import { describe, test, expect } from '@jest/globals';
import { ingredientsMock } from '../mock-data/ingredients';
import { TIngredientsSliceState } from './slice';
import {
  IngredientsActions,
  IngredientsSlice,
  ingredientsInitialState
} from '.';

describe('IngredientsSlice: тесты редьюсеров', () => {
  const initialState: TIngredientsSliceState = ingredientsInitialState;
  const error = new Error('test error');

  test('[#1] получение ингредиентов (pending)', () => {
    const expectedState: TIngredientsSliceState = {
      ...initialState,
      isLoading: true
    };

    const newState = IngredientsSlice.reducer(
      { ...initialState, error: error.message },
      IngredientsActions.getIngredientsThunk.pending('')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#2] получение ингредиентов (rejected with err)', () => {
    const expectedState: TIngredientsSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = IngredientsSlice.reducer(
      { ...initialState, isLoading: true },
      IngredientsActions.getIngredientsThunk.rejected(error, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#3] получение ингредиентов (rejected without err)', () => {
    const expectedState: TIngredientsSliceState = initialState;

    const newState = IngredientsSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      IngredientsActions.getIngredientsThunk.rejected(new Error(''), '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#4] получение ингредиентов (fulfilled)', () => {
    const expectedState: TIngredientsSliceState = {
      ...initialState,
      ingredients: ingredientsMock
    };

    const newState = IngredientsSlice.reducer(
      { ...initialState, isLoading: true },
      IngredientsActions.getIngredientsThunk.fulfilled(ingredientsMock, '')
    );

    expect(newState).toEqual(expectedState);
  });
});