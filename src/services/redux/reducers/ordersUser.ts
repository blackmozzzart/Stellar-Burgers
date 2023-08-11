import { TOrders } from '../types/types';
import {
    WS_USER_ORDERS_DISCONNECTING,
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_USER_ORDERS_GET_MESSAGE,
    UserOrdersWsActions,
} from '../actions/ordersUser';

interface IOrdersUserInitialState {
    wsConnected: boolean;
    orders: TOrders[];
    total: number;
    totalToday: number;
    error?: Event;
};

const initialState: IOrdersUserInitialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

export const ordersUserReducer = (state = initialState, action: UserOrdersWsActions): IOrdersUserInitialState => {
    switch (action.type) {
        case WS_USER_ORDERS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true,
                error: undefined,
            };
        }
        case WS_USER_ORDERS_CONNECTION_ERROR: {
            return {
                ...state,
                wsConnected: false,
                error: action.payload,
            };
        }
        case WS_USER_ORDERS_GET_MESSAGE: {
            const { orders, total, totalToday } = action.data;

            return {
                ...state,
                orders,
                total,
                totalToday,
                error: undefined,
            };
        }
        case WS_USER_ORDERS_CONNECTION_CLOSED:
        case WS_USER_ORDERS_DISCONNECTING: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};
