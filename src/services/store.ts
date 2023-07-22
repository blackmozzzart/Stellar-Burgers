import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createStore, applyMiddleware, AnyAction } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { rootReducer } from "./reducers";

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type DispatchFunc = () => AppDispatch

export type AppThunkAction<D> = ThunkAction<D, RootState, unknown, AnyAction>;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

