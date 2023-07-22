import { AnyAction } from "redux";
import { FETCH_INGREDIENTS_FAILURE, FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS } from "../actions/ingredients";
import { TIngredient } from "../types/types";

interface IInitialState {
    ingredients: TIngredient[];
    loading: boolean;
    error: null | string;
}

const initialState: IInitialState = {
    ingredients: [],
    loading: false,
    error: null,
};

export const ingredientsReducer = (state = initialState, action: AnyAction) => {
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
