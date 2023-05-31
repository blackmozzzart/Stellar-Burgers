import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const SET_BURGER_BUN = 'SET_BURGER_BUN';
export const CLEAR_BURGER_CONSTRUCTOR = 'CLEAR_BURGER_CONSTRUCTOR';

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  payload: {
    ...ingredient,
    uniqId: uuidv4()
  }
});

export const removeIngredient = (ingredient) => ({
  type: REMOVE_INGREDIENT,
  payload: ingredient
});

export const moveIngredient = (ingredient) => ({
  type: MOVE_INGREDIENT,
  payload: ingredient
})

export const setBurgerBun = (ingredient) => ({
  type: SET_BURGER_BUN,
  payload: ingredient
});

export const clearBurgerConstructor = () => ({
  type: CLEAR_BURGER_CONSTRUCTOR
});
