import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  RejectedAction,
  isActionPending,
  isActionRejected
} from '../../utils/slices-checks';
import { TUser, TThunkSliceState } from '@utils-types';
import {
  TRegisterData,
  registerUserApi,
  TLoginData,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';

export const fetchRegisterUserThunk = createAsyncThunk<
  { user: TUser },
  TRegisterData
>('user/fetchRegisterUser', registerUserApi);

export const fetchLoginUserThunk = createAsyncThunk<
  { user: TUser },
  TLoginData
>('user/fetchLoginUser', loginUserApi);

export const fetchUserThunk = createAsyncThunk<{ user: TUser }>(
  'user/fetchUser',
  getUserApi
);

export const fetchUpdateUserThunk = createAsyncThunk<
  { user: TUser },
  Partial<TRegisterData>
>('user/fetchUpdateUser', updateUserApi);

export const fetchLogoutUserThunk = createAsyncThunk(
  'user/fetchLogoutUser',
  logoutApi
);

export type TUserSliceState = TThunkSliceState & {
  user: TUser | null;
  isUserChecked: boolean;
};

export const initialState: TUserSliceState = {
  user: null,
  isUserChecked: false,
  isLoading: false,
  error: null
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userCheck: (state) => {
      state.isUserChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchLoginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUpdateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchLogoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addMatcher(isActionPending('user'), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isActionRejected('user'), (state, action: RejectedAction) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsUserChecked: (state) => state.isUserChecked,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});
