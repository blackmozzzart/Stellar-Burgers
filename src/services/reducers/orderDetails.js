import { FETCH_ORDER_FAILURE, FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, UPDATE_ORDER_NUMBER } from "../actions/orderDetails";

const initialState = {
    order: null,
    loading: false,
    error: null,
    orderNumber: '',
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
                orderNumber: action.payload,
            };
        default:
            return state;
    }
};

// Усилитель
// const orderMiddleware = (store) => (next) => (action) => {
//     if (action.type === FETCH_ORDER_REQUEST) {
//         // Выполнение запроса к API и обработка результатов
//         fetch('api/order')
//             .then((response) => response.json())
//             .then((data) => {
//                 store.dispatch(fetchOrderSuccess(data));
//             })
//             .catch((error) => {
//                 store.dispatch(fetchOrderFailure(error));
//             });
//     }
//     return next(action);
// };