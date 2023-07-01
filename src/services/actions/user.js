export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const setUser = (email, name) => ({
    type: SET_USER,
    payload: { email, name }
});

export const removeUser = () => ({
    type: REMOVE_USER,
    payload: null
});
