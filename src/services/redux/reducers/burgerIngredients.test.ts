import { FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_FAILURE, TFetchIngredientsActionTypes } from '../actions/burgerIngredients';
import { TIngredient } from '../types/types';
import { IIngredientsInitialState, ingredientsReducer } from './burgerIngredients';

describe('ingredientsReducer', () => {
    const initialState: IIngredientsInitialState = {
        ingredients: [],
        loading: false,
        error: null,
    };

    it('should handle FETCH_INGREDIENTS_REQUEST', () => {
        const action: TFetchIngredientsActionTypes = { type: FETCH_INGREDIENTS_REQUEST };
        const nextState = ingredientsReducer(initialState, action);

        expect(nextState.loading).toBe(true);
        expect(nextState.error).toBe(null);
    });

    it('should handle FETCH_INGREDIENTS_SUCCESS', () => {
        const ingredients: TIngredient[] = [
            {
                _id: '1',
                name: 'Lettuce',
                type: 'bun',
                proteins: 123,
                fat: 2321,
                carbohydrates: 432,
                calories: 431,
                price: 12344,
                image: 'url://image',
                image_mobile: 'url://mobile_image',
                image_large: 'url://larget_image',
            },
            {
                _id: '1',
                name: 'Tomato',
                type: 'sauce',
                proteins: 59,
                fat: 231,
                carbohydrates: 432,
                calories: 523,
                price: 1234,
                image: 'url://image',
                image_mobile: 'url://mobile_image',
                image_large: 'url://larget_image',
            },
        ];
        const action: TFetchIngredientsActionTypes = { type: FETCH_INGREDIENTS_SUCCESS, payload: ingredients };
        const nextState = ingredientsReducer(initialState, action);

        expect(nextState.ingredients).toEqual(ingredients);
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe(null);
    });

    it('should handle FETCH_INGREDIENTS_FAILURE', () => {
        const error = 'Failed to fetch ingredients';
        const action: TFetchIngredientsActionTypes = { type: FETCH_INGREDIENTS_FAILURE, payload: error };
        const nextState = ingredientsReducer(initialState, action);

        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe(error);
    });

    it('should return the initial state for unknown action types', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const nextState = ingredientsReducer(initialState, action as any);

        expect(nextState).toEqual(initialState);
    });
});
