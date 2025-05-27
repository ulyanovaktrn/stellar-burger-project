import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TThunkSliceState } from '@utils-types';
import { getOrdersApi } from '@api';

export const getOrdersThunk = createAsyncThunk<TOrder[]>(
  'user-orders/getOrders',
  getOrdersApi
);

export type TUserOrdersSliceState = TThunkSliceState & {
  orders: TOrder[];
};

export const initialState: TUserOrdersSliceState = {
  orders: [],
  isLoading: false,
  error: null
};

export const UserOrdersSlice = createSlice({
  name: 'user-orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});

export const UserOrdersActions = {
  ...UserOrdersSlice.actions,
  getOrdersThunk
};
