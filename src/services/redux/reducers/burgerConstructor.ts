import { ADD_INGREDIENT, CLEAR_BURGER_CONSTRUCTOR, MOVE_INGREDIENT, REMOVE_INGREDIENT, SET_BURGER_BUN, TBurgerConstructorActionTypes } from "../actions/burgerConstructor";

export interface IBurgerConstuctorIngredient { id: string; uniqId: string; }

export interface IBurgerConstructorInitialState {
    ingredients: IBurgerConstuctorIngredient[];
    bun: null | string;
}

const initialState: IBurgerConstructorInitialState = {
    ingredients: [],
    bun: null
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActionTypes): IBurgerConstructorInitialState => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
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