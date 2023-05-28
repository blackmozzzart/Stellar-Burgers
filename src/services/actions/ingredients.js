import { INGREDIENTS_URL } from '../../utils/constants';

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

export const fetchIngredientsThunk = () => async (dispatch) => {
    dispatch({ type: FETCH_INGREDIENTS_REQUEST })

    try {
        const res = await fetch(INGREDIENTS_URL)

        if (!res.ok) {
            throw new Error(`Ошибка ${res.status}`);
        }

        const data = await res.json()
        dispatch({ type: FETCH_INGREDIENTS_SUCCESS, payload: data.data })
    } catch (e) {
        dispatch({ type: FETCH_INGREDIENTS_FAILURE, payload: true })
    }
}
