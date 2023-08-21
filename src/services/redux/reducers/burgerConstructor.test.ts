import { TBurgerConstructorActionTypes, addIngredient, removeIngredient, moveIngredient, setBurgerBun, clearBurgerConstructor } from '../actions/burgerConstructor';
import { IBurgerConstructorInitialState, burgerConstructorReducer } from './burgerConstructor';

describe('burgerConstructorReducer', () => {
    const initialState: IBurgerConstructorInitialState = {
        ingredients: [],
        bun: null,
    };

    it('should handle ADD_INGREDIENT', () => {
        const action = addIngredient('123456');
        const nextState = burgerConstructorReducer(initialState, action);

        expect(nextState.ingredients).toContainEqual(action.payload);
    });

    it('should handle REMOVE_INGREDIENT', () => {
        const initialIngredients = [{ id: '1', uniqId: 'unique1' }, { id: '2', uniqId: 'unique2' }];
        const initialStateWithIngredients = { ...initialState, ingredients: initialIngredients };
        const action = removeIngredient(0);
        const nextState = burgerConstructorReducer(initialStateWithIngredients, action);

        expect(nextState.ingredients).toEqual([{ id: '2', uniqId: 'unique2' }]);
    });

    it('should handle MOVE_INGREDIENT', () => {
        const initialIngredients = [{ id: '1', uniqId: 'unique1' }, { id: '2', uniqId: 'unique2' }, { id: '3', uniqId: 'unique3' }];
        const initialStateWithIngredients = { ...initialState, ingredients: initialIngredients };
        const action = moveIngredient(0, 2);
        const nextState = burgerConstructorReducer(initialStateWithIngredients, action);

        expect(nextState.ingredients).toEqual([{ id: '2', uniqId: 'unique2' }, { id: '3', uniqId: 'unique3' }, { id: '1', uniqId: 'unique1' }]);
    });

    it('should handle SET_BURGER_BUN', () => {
        const action: TBurgerConstructorActionTypes = setBurgerBun('sesame');
        const nextState = burgerConstructorReducer(initialState, action);

        expect(nextState.bun).toBe(action.payload);
    });

    it('should handle CLEAR_BURGER_CONSTRUCTOR', () => {
        const initialStateWithIngredients = { ...initialState, ingredients: [{ id: '1', uniqId: 'unique1' }] };
        const action = clearBurgerConstructor();
        const nextState = burgerConstructorReducer(initialStateWithIngredients, action);

        expect(nextState).toEqual(initialState);
    });

    it('should return the initial state for unknown action types', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const nextState = burgerConstructorReducer(initialState, action as any);

        expect(nextState).toEqual(initialState);
    });
});
