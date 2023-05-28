import { ORDERS_URL } from "../../utils/constants";
import { FETCH_ORDER_FAILURE, FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, UPDATE_ORDER_NUMBER } from "../actions/orderDetails";

const initialState = {
    order: null,
    loading: false,
    error: null,
};

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ORDER_SUCCESS:
            return {
                ...state,
                order: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_ORDER_NUMBER:
            return {
                ...state,
                order: action.payload,
            };
        default:
            return state;
    }
};

export const fetchOrderThunk = () => async (dispatch, getState) => {
    dispatch({ type: FETCH_ORDER_REQUEST })

    try {
        const store = getState();
        const body = [store.burgerConstructor.bun, store.burgerConstructor.bun, ...store.burgerConstructor.ingredients]

        const res = await fetch(ORDERS_URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients: body })
        })


        if (!res.ok) {
            throw new Error(`Ошибка ${res.status}`);
        }

        const data = await res.json()
        dispatch({ type: FETCH_ORDER_SUCCESS, payload: data.order.number })
    } catch (e) {
        dispatch({ type: FETCH_ORDER_FAILURE, payload: true })
    }
}
