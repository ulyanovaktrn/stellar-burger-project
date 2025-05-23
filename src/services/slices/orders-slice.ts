import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TThunkSliceState } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi } from '@api';

export const getOrderByNumberThunk = createAsyncThunk<
  { orders: TOrder[] },
  number
>('orders/getOrderByNumber', getOrderByNumberApi);

export const getOrderBurgerThunk = createAsyncThunk<
  { order: TOrder },
  string[]
>('orders/getOrderBurger', orderBurgerApi);

export type TOrdersSliceState = TThunkSliceState & {
  previewOrder: TOrder | null;
  newOrder: TOrder | null;
};

export const initialState: TOrdersSliceState = {
  previewOrder: null,
  newOrder: null,
  isLoading: false,
  error: null
};

export const OrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.newOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
        state.previewOrder = null;
        state.error = null;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.previewOrder = action.payload.orders[0];
      })
      .addCase(getOrderBurgerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderBurgerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrderBurgerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newOrder = action.payload.order;
      });
  },
  selectors: {
    selectPreviewOrder: (state) => state.previewOrder,
    selectNewOrder: (state) => state.newOrder,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});

export const OrdersActions = {
  ...OrdersSlice.actions,
  getOrderByNumberThunk,
  getOrderBurgerThunk
};
