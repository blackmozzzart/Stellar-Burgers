import { FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, FETCH_ORDER_FAILURE, UPDATE_ORDER_NUMBER, TOrderActionTypes } from '../actions/orderDetails';
import { IOrderDetailsInitialState, orderDetailsReducer } from './orderDetails';

describe('orderDetailsReducer', () => {
    const initialState: IOrderDetailsInitialState = {
        order: null,
        loading: false,
        error: null,
    };

    it('should handle FETCH_ORDER_REQUEST', () => {
        const action: TOrderActionTypes = { type: FETCH_ORDER_REQUEST };
        const nextState = orderDetailsReducer(initialState, action);

        expect(nextState.loading).toBe(true);
        expect(nextState.error).toBe(null);
    });

    it('should handle FETCH_ORDER_SUCCESS', () => {
        const orderNumber = 12345;
        const action: TOrderActionTypes = { type: FETCH_ORDER_SUCCESS, payload: orderNumber };
        const nextState = orderDetailsReducer(initialState, action);

        expect(nextState.order).toBe(orderNumber);
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe(null);
    });

    it('should handle FETCH_ORDER_FAILURE', () => {
        const error = 'Failed to fetch order';
        const action: TOrderActionTypes = { type: FETCH_ORDER_FAILURE, payload: error };
        const nextState = orderDetailsReducer(initialState, action);

        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe(error);
    });

    it('should handle UPDATE_ORDER_NUMBER', () => {
        const orderNumber = 54321;
        const action: TOrderActionTypes = { type: UPDATE_ORDER_NUMBER, payload: orderNumber };
        const nextState = orderDetailsReducer(initialState, action);

        expect(nextState.order).toBe(orderNumber);
    });

    it('should return the initial state for unknown action types', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const nextState = orderDetailsReducer(initialState, action as any);

        expect(nextState).toEqual(initialState);
    });
});
