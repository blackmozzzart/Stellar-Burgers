import { SET_SELECTED_INGREDIENT } from "../actions/ingredientDetails";
import { CLEAR_SELECTED_INGREDIENT } from "../actions/modal";

const initialState = {
    selectedIngredient: null,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_INGREDIENT:
            return {
                ...state,
                selectedIngredient: action.payload,
            };
        case CLEAR_SELECTED_INGREDIENT:
            return {
                ...state,
                selectedIngredient: null,
            };
        default:
            return state;
    }
};