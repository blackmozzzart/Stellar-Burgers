import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../types/types';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_BURGER_BUN = 'SET_BURGER_BUN';
export const CLEAR_BURGER_CONSTRUCTOR = 'CLEAR_BURGER_CONSTRUCTOR';

interface IAddIngredientAction {
  type: typeof ADD_INGREDIENT;
  payload: {
    id: string;
    uniqId: string;
  };
}

interface IRemoveIngredientAction {
  type: typeof REMOVE_INGREDIENT;
  payload: number;
}

interface IMoveIngredientAction {
  type: typeof MOVE_INGREDIENT;
  payload: TIngredient;
}

interface ISetBurgerBunAction {
  type: typeof SET_BURGER_BUN;
  payload: string;
}

interface IClearBurgerConstructorAction {
  type: typeof CLEAR_BURGER_CONSTRUCTOR;
}

export type TBurgerConstructorActionTypes =
  | IAddIngredientAction
  | IRemoveIngredientAction
  | IMoveIngredientAction
  | ISetBurgerBunAction
  | IClearBurgerConstructorAction;

export const addIngredient = (ingredientId: string): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  payload: {
    id: ingredientId,
    uniqId: uuidv4()
  }
});

export const removeIngredient = (ingredientIndex: number): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  payload: ingredientIndex
});

export const moveIngredient = (ingredient: TIngredient): IMoveIngredientAction => ({
  type: MOVE_INGREDIENT,
  payload: ingredient
})

export const setBurgerBun = (ingredient: string): ISetBurgerBunAction => ({
  type: SET_BURGER_BUN,
  payload: ingredient
});

export const clearBurgerConstructor = (): IClearBurgerConstructorAction => ({
  type: CLEAR_BURGER_CONSTRUCTOR
});
