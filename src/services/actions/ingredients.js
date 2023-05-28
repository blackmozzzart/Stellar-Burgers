export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const fetchIngredientsRequest = () => ({
    type: FETCH_INGREDIENTS_REQUEST,
});

export const fetchIngredientsSuccess = (ingredients) => ({
    type: FETCH_INGREDIENTS_SUCCESS,
    payload: ingredients,
});

export const fetchIngredientsFailure = (error) => ({
    type: FETCH_INGREDIENTS_FAILURE,
    payload: error,
});


// Усилитель
const ingredientsMiddleware = (store) => (next) => (action) => {
    if (action.type === FETCH_INGREDIENTS_REQUEST) {
        // Выполнение запроса к API и обработка результатов
        fetch('api/ingredients')
            .then((response) => response.json())
            .then((data) => {
                store.dispatch(fetchIngredientsSuccess(data));
            })
            .catch((error) => {
                store.dispatch(fetchIngredientsFailure(error));
            });
    }
    return next(action);
};

