import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from './root-reducer';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

//const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера

export const store = configureStore({
  reducer: RootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof RootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
