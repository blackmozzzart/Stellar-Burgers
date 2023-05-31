import { ORDERS_URL } from "../../utils/constants";
import { request } from "../../utils/request";
import { clearBurgerConstructor } from "./burgerConstructor";

export const FETCH_ORDER_REQUEST = 'FETCH_ORDER_REQUEST';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_FAILURE = 'FETCH_ORDER_FAILURE';
export const UPDATE_ORDER_NUMBER = 'UPDATE_ORDER_NUMBER';

export const fetchOrderRequest = () => ({
    type: FETCH_ORDER_REQUEST,
});

export const fetchOrderSuccess = (order) => ({
    type: FETCH_ORDER_SUCCESS,
    payload: order,
});

export const fetchOrderFailure = (error) => ({
    type: FETCH_ORDER_FAILURE,
    payload: error,
});

export const updateOrderNumber = (orderNumber) => ({
    type: UPDATE_ORDER_NUMBER,
    payload: orderNumber,
});

export const fetchOrderThunk = () => (dispatch, getState) => {
    dispatch({ type: FETCH_ORDER_REQUEST })

    const store = getState();
    const body = [store.burgerConstructor.bun, store.burgerConstructor.bun, ...store.burgerConstructor.ingredients.map(({ id }) => id)]

    request(ORDERS_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: body })
    })
        .then((data) => {
            dispatch({ type: FETCH_ORDER_SUCCESS, payload: data.order.number })
            dispatch(clearBurgerConstructor())
        })
        .catch(() => {
            dispatch({ type: FETCH_ORDER_FAILURE, payload: true })
        })
}
