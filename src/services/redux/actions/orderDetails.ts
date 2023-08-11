import { ORDERS_URL } from "../../../utils/constants";
import { fetchWithRefresh } from "../../../utils/fetchWithRefresh";
import { AppThunkAction } from "../../store";
import { clearBurgerConstructor } from "./burgerConstructor";

export const FETCH_ORDER_REQUEST = 'FETCH_ORDER_REQUEST';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_FAILURE = 'FETCH_ORDER_FAILURE';
export const UPDATE_ORDER_NUMBER = 'UPDATE_ORDER_NUMBER';

interface IFetchOrderRequestAction {
    type: typeof FETCH_ORDER_REQUEST;
}

interface IFetchOrderSuccessAction {
    type: typeof FETCH_ORDER_SUCCESS;
    payload: number;
}

interface IFetchOrderFailureAction {
    type: typeof FETCH_ORDER_FAILURE;
    payload: string;
}

interface IUpdateOrderNumberAction {
    type: typeof UPDATE_ORDER_NUMBER;
    payload: number;
}

export type TOrderActionTypes =
    | IFetchOrderRequestAction
    | IFetchOrderSuccessAction
    | IFetchOrderFailureAction
    | IUpdateOrderNumberAction;

export const fetchOrderRequest = (): IFetchOrderRequestAction => ({
    type: FETCH_ORDER_REQUEST,
});

export const fetchOrderSuccess = (order: number): IFetchOrderSuccessAction => ({
    type: FETCH_ORDER_SUCCESS,
    payload: order,
});

export const fetchOrderFailure = (error: string): IFetchOrderFailureAction => ({
    type: FETCH_ORDER_FAILURE,
    payload: error,
});

export const updateOrderNumber = (orderNumber: number): IUpdateOrderNumberAction => ({
    type: UPDATE_ORDER_NUMBER,
    payload: orderNumber,
});

// Thunk для получения заказа
export const fetchOrderThunk = (): AppThunkAction<Promise<void>> => (dispatch, getState) => {
    dispatch({ type: FETCH_ORDER_REQUEST })

    const store = getState();
    const body = [store.burgerConstructor.bun, store.burgerConstructor.bun, ...store.burgerConstructor.ingredients.map(({ id }) => id)]

    return fetchWithRefresh(ORDERS_URL, {
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
