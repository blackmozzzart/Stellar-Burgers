import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_BURGER_BUN,
    MOVE_INGREDIENT,
} from "../actions/burgerConstructor";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    ingredients: [],
    bun: null
};

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, { id: action.payload, uniqId: uuidv4() }]
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
        default:
            return state;
    }
};