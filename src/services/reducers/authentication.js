import { FORGOT_PASSWORD, LOGIN, LOGOUT, REFRESH_TOKEN, REGISTRATION, RESET_PASSWORD } from '../actions/authentication';

const initialState = {
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
    refreshTokenRequestFailed: false
}

export const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION: {
            return {
                ...state,
                registrationRequest: true,
                registrationRequestFailed: false,
            }
        }
        case LOGIN: {
            return {
                ...state,
                loginRequest: true,
                loginRequestFailed: false,
            }
        }
        case RESET_PASSWORD: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordRequestFailed: false,
            }
        }
        case FORGOT_PASSWORD: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordRequestFailed: false,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                logoutRequest: true,
                logoutRequestFailed: false,
            }
        }
        case REFRESH_TOKEN: {
            return {
                ...state,
                refreshTokenRequest: true,
                refreshTokenRequestFailed: false,
            }
        }
        default: {
            return state;
        }
    }
}