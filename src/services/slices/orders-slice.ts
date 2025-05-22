import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TThunkSliceState } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi } from '@api';

export const fetchOrderByNumberThunk = createAsyncThunk<
  { orders: TOrder[] },
  number
>('orders/fetchOrderByNumber', getOrderByNumberApi);

export const fetchOrderBurgerThunk = createAsyncThunk<
  { order: TOrder },
  string[]
>('orders/fetchOrderBurger', orderBurgerApi);

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
      .addCase(fetchOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
        state.previewOrder = null;
        state.error = null;
      })
      .addCase(fetchOrderByNumberThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchOrderByNumberThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.previewOrder = action.payload.orders[0];
      })
      .addCase(fetchOrderBurgerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderBurgerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchOrderBurgerThunk.fulfilled, (state, action) => {
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
