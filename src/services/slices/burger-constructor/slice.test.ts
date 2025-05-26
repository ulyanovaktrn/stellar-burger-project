import { describe, test, expect, afterAll } from '@jest/globals';
import { ingredientsMock } from '../mock-data/ingredients';
import { TConstructorBurgerSliceState } from './slice';
import {
  BurgerConstructorActions,
  BurgerConstructorSlice,
  initialState as burgerConstructorInitialState
} from '.';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => '5'
}));

describe('BurgerConstructorSlice: тесты редьюсеров', () => {
  const initialState: TConstructorBurgerSliceState = {
    ingredients: [
      { ...ingredientsMock[2], id: '1' },
      { ...ingredientsMock[4], id: '2' },
      { ...ingredientsMock[7], id: '3' }
    ],
    bun: { ...ingredientsMock[0], id: '4' }
  };

  test('[#1] добавление main/sauce', () => {
    const expectedState: TConstructorBurgerSliceState = {
      ...initialState,
      ingredients: [
        ...initialState.ingredients,
        { ...ingredientsMock[5], id: '5' }
      ]
    };

    const newState = BurgerConstructorSlice.reducer(
      initialState,
      BurgerConstructorActions.addIngredient(ingredientsMock[5])
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#2] добавление bun', () => {
    const expectedState: TConstructorBurgerSliceState = {
      ...initialState,
      bun: { ...ingredientsMock[1], id: '5' }
    };

    const newState = BurgerConstructorSlice.reducer(
      initialState,
      BurgerConstructorActions.addIngredient(ingredientsMock[1])
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#3] удаление ингредиента', () => {
    const expectedState: TConstructorBurgerSliceState = {
      ...initialState,
      ingredients: [
        { ...ingredientsMock[2], id: '1' },
        { ...ingredientsMock[7], id: '3' }
      ]
    };

    const newState = BurgerConstructorSlice.reducer(
      initialState,
      BurgerConstructorActions.removeIngredient('2')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#4] переупорядочение ингридиентов', () => {
    const expectedState: TConstructorBurgerSliceState = {
      ...initialState,
      ingredients: [
        { ...ingredientsMock[7], id: '3' },
        { ...ingredientsMock[2], id: '1' },
        { ...ingredientsMock[4], id: '2' }
      ]
    };

    const newState = BurgerConstructorSlice.reducer(
      initialState,
      BurgerConstructorActions.reorderIngredients({ from: 2, to: 0 })
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#5] очистка конструктора', () => {
    const expectedState: TConstructorBurgerSliceState =
      burgerConstructorInitialState;

    const newState = BurgerConstructorSlice.reducer(
      initialState,
      BurgerConstructorActions.clearIngredients()
    );

    expect(newState).toEqual(expectedState);
  });
});