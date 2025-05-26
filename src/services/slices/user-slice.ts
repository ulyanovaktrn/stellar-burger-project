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

export const getRegisterUserThunk = createAsyncThunk<
  { user: TUser },
  TRegisterData
>('user/getRegisterUser', registerUserApi);

export const getLoginUserThunk = createAsyncThunk<{ user: TUser }, TLoginData>(
  'user/getLoginUser',
  loginUserApi
);

export const getUserThunk = createAsyncThunk<{ user: TUser }>(
  'user/getUser',
  getUserApi
);

export const getUpdateUserThunk = createAsyncThunk<
  { user: TUser },
  Partial<TRegisterData>
>('user/getUpdateUser', updateUserApi);

export const getLogoutUserThunk = createAsyncThunk(
  'user/getLogoutUser',
  logoutApi
);

export type TUserSliceState = TThunkSliceState & {
  user: TUser | null;
  isAuthChecked: boolean;
};

export const initialState: TUserSliceState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegisterUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getLoginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getUpdateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getLogoutUserThunk.fulfilled, (state) => {
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
    selectIsAuth: (state) => state.isAuthChecked,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});

export const UserActions = {
  ...UserSlice.actions,
  getRegisterUserThunk,
  getLoginUserThunk,
  getLogoutUserThunk,
  getUserThunk,
  getUpdateUserThunk
};
