import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createStore, applyMiddleware, AnyAction } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { rootReducer } from "./redux/reducers";
import { socketMiddleware } from './redux/middleware/socketMiddleware';

import * as userOrders from './redux/actions/ordersUser';
import * as feedOrders from './redux/actions/ordersFeed';

const feedActions = {
  wsConnectionStart: feedOrders.WS_ORDERS_CONNECTION_START,
  wsDisconnecting: feedOrders.WS_ORDERS_DISCONNECTING,
  wsConnectionSuccess: feedOrders.wsConnectionSuccess,
  wsConnectionError: feedOrders.wsConnectionError,
  wsConnectionClosed: feedOrders.wsConnectionClosed,
  wsGetMessage: feedOrders.wsGetMessage,
}

const userOrdersActions = {
  wsConnectionStart: userOrders.WS_USER_ORDERS_CONNECTION_START,
  wsDisconnecting: userOrders.WS_USER_ORDERS_DISCONNECTING,
  wsConnectionSuccess: userOrders.wsConnectionSuccess,
  wsConnectionError: userOrders.wsConnectionError,
  wsConnectionClosed: userOrders.wsConnectionClosed,
  wsGetMessage: userOrders.wsGetMessage,
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      socketMiddleware(feedActions),
      socketMiddleware(userOrdersActions),
      thunk
    )
  )
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppThunkAction<D> = ThunkAction<D, RootState, unknown, AnyAction>;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type DispatchFunc = () => AppThunkDispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector