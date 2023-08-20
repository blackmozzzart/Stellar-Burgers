import { TIngredient } from "../types/types";
import { FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_FAILURE, TFetchIngredientsActionTypes } from "../actions/burgerIngredients";

export interface IIngredientsInitialState {
    ingredients: TIngredient[];
    loading: boolean;
    error: null | string;
}

const initialState: IIngredientsInitialState = {
    ingredients: [],
    loading: false,
    error: null,
};

export const ingredientsReducer = (state = initialState, action: TFetchIngredientsActionTypes): IIngredientsInitialState => {
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
