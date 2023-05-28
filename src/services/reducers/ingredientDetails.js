import { SET_SELECTED_INGREDIENT } from "../actions/ingredientDetails";

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
        default:
            return state;
    }
};