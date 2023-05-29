export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const SET_BURGER_BUN = 'SET_BURGER_BUN';

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
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