import { describe, test, expect } from '@jest/globals';
import { feedMock } from '../mock-data/feed';
import { TFeedOrdersSliceState } from './slice';
import { FeedSlice, FeedActions, feedInitialState } from '.';

describe('FeedSlice: тесты редьюсеров', () => {
  const initialState: TFeedOrdersSliceState = feedInitialState;
  const error = new Error('test error');

  test('[#1] получение ленты заказов (pending)', () => {
    const expectedState: TFeedOrdersSliceState = {
      ...initialState,
      isLoading: true
    };

    const newState = FeedSlice.reducer(
      { ...initialState, error: error.message },
      FeedActions.getFeedsThunk.pending('')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#2] получение ленты заказов (rejected with err)', () => {
    const expectedState: TFeedOrdersSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = FeedSlice.reducer(
      { ...initialState, isLoading: true },
      FeedActions.getFeedsThunk.rejected(error, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#3] получение ленты заказов (rejected without err)', () => {
    const expectedState: TFeedOrdersSliceState = initialState;

    const newState = FeedSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      FeedActions.getFeedsThunk.rejected(new Error(''), '')
    );

    expect(newState).toEqual(expectedState);
    });

  test('[#4] получение ленты заказов (fulfilled)', () => {
    const expectedState: TFeedOrdersSliceState = {
      ...initialState,
      ...feedMock
    };

    const newState = FeedSlice.reducer(
      { ...initialState, isLoading: true },
      FeedActions.getFeedsThunk.fulfilled(feedMock, '')
    );

    expect(newState).toEqual(expectedState);
  });
});