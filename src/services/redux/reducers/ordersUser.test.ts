import {
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_GET_MESSAGE,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_USER_ORDERS_DISCONNECTING,
    UserOrdersWsActions,
    wsConnectionSuccess,
} from '../actions/ordersUser';
import { TWSOrdersStatus } from '../types/types';
import { IOrdersUserInitialState, ordersUserReducer } from './ordersUser';

describe('ordersUserReducer', () => {
    const initialState: IOrdersUserInitialState = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
        error: undefined,
    };

    it('should handle WS_USER_ORDERS_CONNECTION_SUCCESS', () => {
        const action = wsConnectionSuccess(new Event('succes'));
        const nextState = ordersUserReducer(initialState, action);

        expect(nextState.wsConnected).toBe(true);
        expect(nextState.error).toBeUndefined();
    });

    it('should handle WS_USER_ORDERS_CONNECTION_ERROR', () => {
        const error = new Event('Connection error');
        const action: UserOrdersWsActions = { type: WS_USER_ORDERS_CONNECTION_ERROR, payload: error };
        const nextState = ordersUserReducer(initialState, action);

        expect(nextState.wsConnected).toBe(false);
        expect(nextState.error).toBe(error);
    });

    it('should handle WS_USER_ORDERS_GET_MESSAGE', () => {
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
        const action: UserOrdersWsActions = { type: WS_USER_ORDERS_GET_MESSAGE, data: { orders, total, totalToday } };
        const nextState = ordersUserReducer(initialState, action);

        expect(nextState.orders).toEqual(orders);
        expect(nextState.total).toBe(total);
        expect(nextState.totalToday).toBe(totalToday);
        expect(nextState.error).toBeUndefined();
    });

    it('should handle WS_USER_ORDERS_CONNECTION_CLOSED', () => {
        const action: UserOrdersWsActions = { type: WS_USER_ORDERS_CONNECTION_CLOSED };
        const nextState = ordersUserReducer(initialState, action);

        expect(nextState).toEqual(initialState);
    });

    it('should handle WS_USER_ORDERS_DISCONNECTING', () => {
        const action: UserOrdersWsActions = { type: WS_USER_ORDERS_DISCONNECTING };
        const nextState = ordersUserReducer(initialState, action);

        expect(nextState).toEqual(initialState);
    });

    it('should return the initial state for unknown action types', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const nextState = ordersUserReducer(initialState, action as any);

        expect(nextState).toEqual(initialState);
    });
});
