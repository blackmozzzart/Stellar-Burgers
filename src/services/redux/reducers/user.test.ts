import {
    registrationSuccess,
    setUser,
    removeUser,
} from '../actions/user';
import { IUserInitialState, getInitialState, userReducer } from './user';

describe('userReducer', () => {
    const initialState: IUserInitialState = getInitialState();

    it('should handle REGISTRATION_SUCCESS', () => {
        const action = registrationSuccess();
        const nextState = userReducer(initialState, action);

        expect(nextState.registrationRequest).toBe(true);
        expect(nextState.registrationRequestFailed).toBe(false);
    });

    // Add similar tests for other action types...

    it('should handle SET_USER', () => {
        const action = setUser('test@example.com', 'Test User', '107143', '123456789');
        const nextState = userReducer(initialState, action);

        expect(nextState.isLoggedIn).toBe(true);
        expect(nextState.email).toBe(action.payload.email);
        expect(nextState.name).toBe(action.payload.name);
    });

    it('should handle REMOVE_USER', () => {
        const action = removeUser();
        const nextState = userReducer(initialState, action);

        expect(nextState).toEqual(initialState);
    });

    // Add more tests for other action types...

    it('should return the initial state when action type is unknown', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const nextState = userReducer(initialState, action as any);

        expect(nextState).toEqual(initialState);
    });
});
