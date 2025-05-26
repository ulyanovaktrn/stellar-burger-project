import { describe, test, expect } from '@jest/globals';
import { userMock } from '../mock-data/user';
import { TUserSliceState } from './slice';
import { UserSlice, UserActions, initialState as userInitialState } from '.';

describe('UserSlice: тесты редьюсеров', () => {
  const initialState: TUserSliceState = userInitialState;
  const error = new Error('test error');
  const blankError = new Error('');
  const registerData = { ...userMock, password: '12345678' };
  const loginData = { email: userMock.email, password: '12345678' };
  const updateData = {
    name: 'TEST',
    email: 'test@mail.ru',
    password: '87654321'
  };

  test('[#1] регистрация пользователя (pending)', () => {
    const expectedState: TUserSliceState = { ...initialState, isLoading: true };

    const newState = UserSlice.reducer(
      { ...initialState, error: error.message },
      UserActions.getRegisterUserThunk.pending('', registerData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#2] регистрация пользователя (rejected with err)', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = UserSlice.reducer(
      { ...initialState, isLoading: true },
      UserActions.getRegisterUserThunk.rejected(error, '', registerData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#3] регистрация пользователя (rejected without err)', () => {
    const expectedState: TUserSliceState = initialState;

    const newState = UserSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      UserActions.getRegisterUserThunk.rejected(blankError, '', registerData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#4] регистрация пользователя (fulfilled)', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: userMock
    };

    const newState = UserSlice.reducer(
      { ...initialState, isLoading: true },
      UserActions.getRegisterUserThunk.fulfilled(
        { user: userMock },
        '',
        registerData
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#5] авторизация пользователя (pending)', () => {
    const expectedState: TUserSliceState = { ...initialState, isLoading: true };

    const newState = UserSlice.reducer(
      { ...initialState, error: error.message },
      UserActions.getLoginUserThunk.pending('', loginData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#6] авторизация пользователя (rejected with err)', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = UserSlice.reducer(
      { ...initialState, isLoading: true },
      UserActions.getLoginUserThunk.rejected(error, '', loginData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#7] авторизация пользователя (rejected without err)', () => {
    const expectedState: TUserSliceState = initialState;

    const newState = UserSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      UserActions.getLoginUserThunk.rejected(blankError, '', loginData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#8] авторизация пользователя (fulfilled)', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: userMock
    };

    const newState = UserSlice.reducer(
      { ...initialState, isLoading: true },
      UserActions.getLoginUserThunk.fulfilled(
        { user: userMock },
        '',
        loginData
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#9] получение пользователя (pending)', () => {
    const expectedState: TUserSliceState = { ...initialState, isLoading: true };

    const newState = UserSlice.reducer(
      { ...initialState, error: error.message },
      UserActions.getUserThunk.pending('')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#10] получение пользователя (rejected with err)', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = UserSlice.reducer(
      { ...initialState, isLoading: true },
      UserActions.getUserThunk.rejected(error, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#11] получение пользователя (rejected without err)', () => {
    const expectedState: TUserSliceState = initialState;

    const newState = UserSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      UserActions.getUserThunk.rejected(blankError, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#12] получение пользователя (fulfilled)', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: userMock
    };

    const newState = UserSlice.reducer(
      { ...initialState, isLoading: true },
      UserActions.getUserThunk.fulfilled({ user: userMock }, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#13] обновление пользователя (pending)', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      isLoading: true,
      user: userMock
    };

    const newState = UserSlice.reducer(
      { ...initialState, error: error.message, user: userMock },
      UserActions.getUpdateUserThunk.pending('', updateData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#14] обновление пользователя (rejected with err)', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      error: error.message,
      user: userMock
    };

    const newState = UserSlice.reducer(
      { ...initialState, isLoading: true, user: userMock },
      UserActions.getUpdateUserThunk.rejected(error, '', updateData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#15] обновление пользователя (rejected without err)', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: userMock
    };

    const newState = UserSlice.reducer(
      {
        ...initialState,
        isLoading: true,
        error: error.message,
        user: userMock
      },
      UserActions.getUpdateUserThunk.rejected(blankError, '', updateData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#16] обновление пользователя (fulfilled)', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: { name: updateData.name, email: updateData.email }
    };

    const newState = UserSlice.reducer(
      { ...initialState, isLoading: true, user: userMock },
      UserActions.getUpdateUserThunk.fulfilled(
        { user: { name: updateData.name, email: updateData.email } },
        '',
        updateData
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#17] выход пользователя (pending)', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      isLoading: true,
      user: userMock
    };

    const newState = UserSlice.reducer(
      { ...initialState, error: error.message, user: userMock },
      UserActions.getLogoutUserThunk.pending('')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#18] выход пользователя (rejected with err)', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      error: error.message,
      user: userMock
    };

    const newState = UserSlice.reducer(
      { ...initialState, isLoading: true, user: userMock },
      UserActions.getLogoutUserThunk.rejected(error, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#19] выход пользователя (rejected with err)', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: userMock
    };

    const newState = UserSlice.reducer(
      {
        ...initialState,
        isLoading: true,
        error: error.message,
        user: userMock
      },
      UserActions.getLogoutUserThunk.rejected(blankError, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#20] выход пользователя (fulfilled)', () => {
    const expectedState: TUserSliceState = initialState;

    const newState = UserSlice.reducer(
      { ...initialState, isLoading: true, user: userMock },
      UserActions.getLogoutUserThunk.fulfilled(undefined, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#21] проверка авторизации', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: userMock,
      isAuthChecked: true
    };

    const newState = UserSlice.reducer(
      { ...initialState, user: userMock },
      UserActions.authCheck()
    );

    expect(newState).toEqual(expectedState);
  });
});