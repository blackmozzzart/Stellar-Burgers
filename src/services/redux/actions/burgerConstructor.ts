import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../types/types';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_BURGER_BUN = 'SET_BURGER_BUN';
export const CLEAR_BURGER_CONSTRUCTOR = 'CLEAR_BURGER_CONSTRUCTOR';

type TAddIngredient = {
  readonly type: typeof ADD_INGREDIENT;
  ingredient: TIngredient;
}
type TRemoveIngredient = {
  readonly type: typeof REMOVE_INGREDIENT;
  ingredient: TIngredient;
}
type TMoveIngredient = {
  readonly type: typeof MOVE_INGREDIENT;
  ingredient: TIngredient;
}
type TSetBurgerBun = {
  readonly type: typeof SET_BURGER_BUN;
  ingredient: string;
}
type TClearBurgerConstructor = {
  readonly type: typeof CLEAR_BURGER_CONSTRUCTOR;
}

export type BurgerConstructorActions =
  | TAddIngredient
  | TRemoveIngredient
  | TMoveIngredient
  | TSetBurgerBun
  | TClearBurgerConstructor

export const addIngredient = (ingredientId: string) => ({
  type: ADD_INGREDIENT,
  payload: {
    id: ingredientId,
    uniqId: uuidv4()
  }
});

export const removeIngredient = (ingredient: TIngredient) => ({
  type: REMOVE_INGREDIENT,
  payload: ingredient
});

export const moveIngredient = (ingredient: TIngredient) => ({
  type: MOVE_INGREDIENT,
  payload: ingredient
})

export const setBurgerBun = (ingredient: string) => ({
  type: SET_BURGER_BUN,
  payload: ingredient
});

export const clearBurgerConstructor = () => ({
  type: CLEAR_BURGER_CONSTRUCTOR
});
