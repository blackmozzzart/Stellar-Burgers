import { AnyAction } from "redux";
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_BURGER_BUN,
    MOVE_INGREDIENT,
    CLEAR_BURGER_CONSTRUCTOR,
} from "../actions/burgerConstructor";
import { TIngredient } from "../types/types";

interface IInitialState {
    ingredients: TIngredient[];
    bun: null | TIngredient;
}

const initialState: IInitialState = {
    ingredients: [],
    bun: null
};

export const burgerConstructorReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload as TIngredient]
            };
        case REMOVE_INGREDIENT:
            const newIngredients = [...state.ingredients]

            newIngredients.splice(action.payload, 1);

            return {
                ...state,
                ingredients: newIngredients
            };
        case MOVE_INGREDIENT: {
            const newIngredients = [...state.ingredients]
            const { from, to } = action.payload;
            const element = newIngredients[from];
            newIngredients.splice(from, 1);
            newIngredients.splice(to, 0, element);

            return {
                ...state,
                ingredients: newIngredients
            };
        }
        case SET_BURGER_BUN:
            return {
                ...state,
                bun: action.payload
            };
        case CLEAR_BURGER_CONSTRUCTOR:
            return initialState;
        default:
            return state;
    }
};