import {
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_GET_MESSAGE,
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_DISCONNECTING,
    OrdersWsActions,
    wsConnectionSuccess,
} from '../actions/ordersFeed';
import { TWSOrdersStatus } from '../types/types';
import { IOrdersFeedInitialState, ordersFeedReducer } from './ordersFeed';

describe('ordersFeedReducer', () => {
    const initialState: IOrdersFeedInitialState = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
        error: undefined,
    };

    it('should handle WS_ORDERS_CONNECTION_SUCCESS', () => {
        const action = wsConnectionSuccess(new Event('success'));
        const nextState = ordersFeedReducer(initialState, action);

        expect(nextState.wsConnected).toBe(true);
        expect(nextState.error).toBeUndefined();
    });

    it('should handle WS_ORDERS_CONNECTION_ERROR', () => {
        const error = new Event('Connection error');
        const action: OrdersWsActions = { type: WS_ORDERS_CONNECTION_ERROR, payload: error };
        const nextState = ordersFeedReducer(initialState, action);

        expect(nextState.wsConnected).toBe(false);
        expect(nextState.error).toBe(error);
    });

    it('should handle WS_ORDERS_GET_MESSAGE', () => {
        const orders = [
            {
                createdAt: '12.02.2024',
                ingredients: ['Tomato', 'Potato', 'Bonano'],
                name: 'succes',
                number: 123456,
                status: TWSOrdersStatus.DONE,
                updatedAt: '32',
                _id: '1',
            }
        ];
        const total = 30;
        const totalToday = 10;
        const action: OrdersWsActions = { type: WS_ORDERS_GET_MESSAGE, data: { orders, total, totalToday } };
        const nextState = ordersFeedReducer(initialState, action);

        expect(nextState.orders).toEqual(orders);
        expect(nextState.total).toBe(total);
        expect(nextState.totalToday).toBe(totalToday);
        expect(nextState.error).toBeUndefined();
    });

    it('should handle WS_ORDERS_CONNECTION_CLOSED', () => {
        const action: OrdersWsActions = { type: WS_ORDERS_CONNECTION_CLOSED };
        const nextState = ordersFeedReducer(initialState, action);

        expect(nextState).toEqual(initialState);
    });

    it('should handle WS_ORDERS_DISCONNECTING', () => {
        const action: OrdersWsActions = { type: WS_ORDERS_DISCONNECTING };
        const nextState = ordersFeedReducer(initialState, action);

        expect(nextState).toEqual(initialState);
    });

    it('should return the initial state for unknown action types', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const nextState = ordersFeedReducer(initialState, action as any);

        expect(nextState).toEqual(initialState);
    });
});
