import { REMOVE_USER, SET_USER } from "../actions/user";

const initialState = {
    isLoggedIn: false,
    email: '',
    name: '',
}

function getInitialState() {
    if (sessionStorage.getItem('user')) {
        const user = JSON.parse(sessionStorage.getItem('user'));
        return {
            isLoggedIn: true,
            email: user.email,
            name: user.name,
        }
    } else {
        return initialState;
    }
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                isLoggedIn: true,
                ...action.payload
            };
        }
        case REMOVE_USER: {
            return initialState;
        }
        default: {
            return getInitialState();
        }
    }
}

