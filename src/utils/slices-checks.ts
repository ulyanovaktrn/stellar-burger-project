import { AsyncThunk, SerializedError, UnknownAction } from '@reduxjs/toolkit';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;

export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']> & {
  error: SerializedError;
};

const hasPrefix = (action: UnknownAction, prefix: string): boolean =>
  action.type.startsWith(prefix + '/');

const isPending = (action: PendingAction): boolean =>
  action.type.endsWith('/pending');

const isRejected = (action: RejectedAction): boolean =>
  action.type.endsWith('/rejected');

export const isActionPending = (prefix: string) => (action: PendingAction) =>
  hasPrefix(action, prefix) && isPending(action);

export const isActionRejected = (prefix: string) => (action: RejectedAction) =>
  hasPrefix(action, prefix) && isRejected(action);
