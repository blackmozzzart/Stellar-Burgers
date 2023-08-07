import { INGREDIENTS_URL } from '../../../utils/constants';
import { request } from '../../../utils/request';
import { AppThunkAction, AppThunkDispatch } from '../../store';
import { TIngredient } from '../types/types';

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

type TFetchIngredientsRequest = {
    readonly type: typeof FETCH_INGREDIENTS_REQUEST;
}
type TFetchIngredientsSuccess = {
    readonly type: typeof FETCH_INGREDIENTS_SUCCESS;
    ingredients: TIngredient;
}
type TFetchIngredientsFailure = {
    readonly type: typeof FETCH_INGREDIENTS_FAILURE;
    error: string;
}

export type BurgerIngredientsActions =
    | TFetchIngredientsRequest
    | TFetchIngredientsSuccess
    | TFetchIngredientsFailure

export const fetchIngredientsRequest = () => ({
    type: FETCH_INGREDIENTS_REQUEST,
});

export const fetchIngredientsSuccess = (ingredients: TIngredient) => ({
    type: FETCH_INGREDIENTS_SUCCESS,
    payload: ingredients,
});

export const fetchIngredientsFailure = (error: string) => ({
    type: FETCH_INGREDIENTS_FAILURE,
    payload: error,
});

export const fetchIngredientsThunk = (): AppThunkAction<Promise<void>> => (dispatch) => {
    dispatch({ type: FETCH_INGREDIENTS_REQUEST })
    return request(INGREDIENTS_URL)
        .then((data) => {
            dispatch({ type: FETCH_INGREDIENTS_SUCCESS, payload: data.data })
        })
        .catch(() => {
            dispatch({ type: FETCH_INGREDIENTS_FAILURE, payload: true })
        })
}