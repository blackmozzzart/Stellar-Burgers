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


// Усилитель
const orderMiddleware = (store) => (next) => (action) => {
    if (action.type === FETCH_ORDER_REQUEST) {
        // Выполнение запроса к API и обработка результатов
        fetch('api/order')
            .then((response) => response.json())
            .then((data) => {
                store.dispatch(fetchOrderSuccess(data));
            })
            .catch((error) => {
                store.dispatch(fetchOrderFailure(error));
            });
    }
    return next(action);
};