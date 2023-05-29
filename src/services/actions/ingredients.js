import { INGREDIENTS_URL } from '../../utils/constants';
import { request } from '../../utils/request';

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

export const fetchIngredientsThunk = () => (dispatch) => {
    dispatch({ type: FETCH_INGREDIENTS_REQUEST })
    request(INGREDIENTS_URL)
        .then((data) => {
            dispatch({ type: FETCH_INGREDIENTS_SUCCESS, payload: data.data })
        })
        .catch(() => {
            dispatch({ type: FETCH_INGREDIENTS_FAILURE, payload: true })
        })
}