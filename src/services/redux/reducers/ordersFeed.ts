import { AnyAction } from 'redux';
import {
    WS_ORDERS_DISCONNECTING,
    WS_ORDERS_CONNECTION_SUCCESS,
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_GET_MESSAGE,
} from '../actions/ordersFeed';

import { TWSOrders } from "../types/types";

type WSState = {
    wsConnected: boolean;
    orders: ReadonlyArray<TWSOrders>;
    total: number;
    totalToday: number;
    error?: Event;
};

const initialState: WSState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

export const ordersFeedReducer = (state = initialState, action: AnyAction): WSState => {
    switch (action.type) {
        case WS_ORDERS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true,
                error: undefined,
            };
        }
        case WS_ORDERS_CONNECTION_ERROR: {
            return {
                ...state,
                wsConnected: false,
                error: action.payload,
            };
        }
        case WS_ORDERS_GET_MESSAGE: {
            const { orders, total, totalToday } = action.data;

            return {
                ...state,
                orders,
                total,
                totalToday,
                error: undefined,
            };
        }
        case WS_ORDERS_CONNECTION_CLOSED:
        case WS_ORDERS_DISCONNECTING: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};
