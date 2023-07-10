import { FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, GET_USER_FAILURE, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS, REFRESH_TOKEN_FAILURE, REFRESH_TOKEN_SUCCESS, REGISTRATION_FAILURE, REGISTRATION_SUCCESS, REMOVE_USER, RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS, SET_USER, UPDATE_USER, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS } from "../actions/user";

const initialState = {
    isLoggedIn: false,
    email: '',
    name: '',

    getUserRequest: false,
    changeUserRequest: false,
    updateUserRequest: false,

    registrationRequest: false,
    registrationRequestFailed: false,

    loginRequest: false,
    loginRequestFailed: false,

    resetPasswordRequest: false,
    resetPasswordRequestFailed: false,

    forgotPasswordRequest: false,
    forgotPasswordRequestFailed: false,

    logoutRequest: false,
    logoutRequestFailed: false,

    refreshTokenRequest: false,
    refreshTokenRequestFailed: false,

    accessToken: null,
    refreshToken: null,
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
        case REGISTRATION_SUCCESS: {
            return {
                ...state,
                registrationRequest: true,
                registrationRequestFailed: false,
            }
        }
        case REGISTRATION_FAILURE: {
            return {
                ...state,
                registrationRequest: false,
                registrationRequestFailed: true,
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequest: true,
                loginRequestFailed: false,
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                loginRequest: false,
                loginRequestFailed: true,
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordRequestFailed: false,
            }
        }
        case RESET_PASSWORD_FAILURE: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordRequestFailed: true,
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordRequestFailed: false,
            }
        }
        case FORGOT_PASSWORD_FAILURE: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordRequestFailed: true,
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutRequest: true,
                logoutRequestFailed: false,
            }
        }
        case LOGOUT_FAILURE: {
            return {
                ...state,
                logoutRequest: false,
                logoutRequestFailed: true,
            }
        }
        case REFRESH_TOKEN_SUCCESS: {
            // const accessToken = action.data.accessToken.split('Bearer ')[1];
            // const refreshToken = action.data.refreshToken;

            // localStorage.setItem('accessToken', JSON.stringify(accessToken));
            // localStorage.setItem('refreshToken', JSON.stringify(refreshToken));

            return {
                ...state,
                refreshTokenRequest: true,
                refreshTokenRequestFailed: false,
                // accessToken: accessToken,
                // refreshToken: refreshToken,
            }
        }
        case REFRESH_TOKEN_FAILURE: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenRequestFailed: true,
            }
        }
        case SET_USER: {
            return {
                isLoggedIn: true,
                ...action.payload
            };
        }
        case REMOVE_USER: {
            return initialState;
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserRequest: true,
            }
        }
        case GET_USER_FAILURE: {
            return {
                ...state,
                getUserRequest: false,
            }
        }
        case UPDATE_USER: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserRequest: true,
            }
        }
        case UPDATE_USER_FAILURE: {
            return {
                ...state,
                updateUserRequest: false,
            }
        }
        default: {
            return getInitialState();
        }
    }
}