import { FETCH_ORDER_FAILURE, FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, TOrderActionTypes, UPDATE_ORDER_NUMBER } from "../actions/orderDetails";

export type IOrderDetailsInitialState = {
    order: number | null;
    loading: boolean;
    error: string | null;
}

const initialState: IOrderDetailsInitialState = {
    order: null,
    loading: false,
    error: null,
};

export const orderDetailsReducer = (state = initialState, action: TOrderActionTypes): IOrderDetailsInitialState => {
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

