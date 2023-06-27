import { FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS, REFRESH_TOKEN_FAILURE, REFRESH_TOKEN_SUCCESS, REGISTRATION_FAILURE, REGISTRATION_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS } from '../actions/authentication';

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
            return {
                ...state,
                refreshTokenRequest: true,
                refreshTokenRequestFailed: false,
            }
        }
        case REFRESH_TOKEN_FAILURE: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenRequestFailed: true,
            }
        }
        default: {
            return state;
        }
    }
}