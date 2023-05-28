import { FETCH_INGREDIENTS_FAILURE, FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS } from "../actions/ingredients";

const initialState = {
    ingredients: [],
    loading: false,
    error: null,
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INGREDIENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_INGREDIENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

// Усилитель
// const ingredientsMiddleware = (store) => (next) => (action) => {
//     if (action.type === FETCH_INGREDIENTS_REQUEST) {
//         // Выполнение запроса к API и обработка результатов
//         fetch('api/ingredients')
//             .then((response) => response.json())
//             .then((data) => {
//                 store.dispatch(fetchIngredientsSuccess(data));
//             })
//             .catch((error) => {
//                 store.dispatch(fetchIngredientsFailure(error));
//             });
//     }
//     return next(action);
// };

