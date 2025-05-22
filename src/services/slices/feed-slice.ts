import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData, TThunkSliceState } from '@utils-types';
import { getFeedsApi } from '@api';

export const fetchFeedsThunk = createAsyncThunk<TOrdersData>(
  'feedOrders/fetchFeeds',
  getFeedsApi
);

export type TFeedOrdersSliceState = TThunkSliceState & TOrdersData;

export const initialState: TFeedOrdersSliceState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const FeedSlice = createSlice({
  name: 'feed-orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchFeedsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});
