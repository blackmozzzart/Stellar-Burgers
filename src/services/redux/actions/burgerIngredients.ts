import { INGREDIENTS_URL } from '../../../utils/constants';
import { request } from '../../../utils/request';
import { AppThunkAction } from '../../store';
import { TIngredient } from '../types/types';

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

interface IFetchIngredientsRequestAction {
    type: typeof FETCH_INGREDIENTS_REQUEST;
}

interface IFetchIngredientsSuccessAction {
    type: typeof FETCH_INGREDIENTS_SUCCESS;
    payload: TIngredient[];
}

interface IFetchIngredientsFailureAction {
    type: typeof FETCH_INGREDIENTS_FAILURE;
    payload: string;
}

export type TFetchIngredientsActionTypes =
    | IFetchIngredientsRequestAction
    | IFetchIngredientsSuccessAction
    | IFetchIngredientsFailureAction;

export const fetchIngredientsRequest = (): IFetchIngredientsRequestAction => ({
    type: FETCH_INGREDIENTS_REQUEST,
});

export const fetchIngredientsSuccess = (ingredients: TIngredient[]): IFetchIngredientsSuccessAction => ({
    type: FETCH_INGREDIENTS_SUCCESS,
    payload: ingredients,
});

export const fetchIngredientsFailure = (error: string): IFetchIngredientsFailureAction => ({
    type: FETCH_INGREDIENTS_FAILURE,
    payload: error,
});

// Асинхронный Thunk для получения ингредиентов
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