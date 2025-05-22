import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TThunkSliceState } from '@utils-types';
import { getIngredientsApi } from '@api';

export const fetchIngredientsThunk = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

export type TIngredientsSliceState = TThunkSliceState & {
  ingredients: TIngredient[];
};

export const initialState: TIngredientsSliceState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const IngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});
