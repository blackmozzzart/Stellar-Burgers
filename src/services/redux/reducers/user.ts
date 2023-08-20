import { getAccessToken, getRefreshToken, parseToken } from "../../../utils/tokenHelpet";
import { FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, GET_USER_FAILURE, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS, REFRESH_TOKEN_FAILURE, REFRESH_TOKEN_SUCCESS, REGISTRATION_FAILURE, REGISTRATION_SUCCESS, REMOVE_USER, RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS, SET_USER, TUserActionTypes, UPDATE_USER, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS } from "../actions/user";

export interface IUserInitialState {
    isLoggedIn: boolean,
    email: string,
    name: string,
    password: string,

    getUserRequest: boolean,
    changeUserRequest: boolean,
    updateUserRequest: boolean,

    registrationRequest: boolean,
    registrationRequestFailed: boolean,

    loginRequest: boolean,
    loginRequestFailed: boolean,

    resetPasswordRequest: boolean,
    resetPasswordRequestFailed: boolean,

    forgotPasswordRequest: boolean,
    forgotPasswordRequestFailed: boolean,

    logoutRequest: boolean,
    logoutRequestFailed: boolean,

    refreshTokenRequest: boolean,
    refreshTokenRequestFailed: boolean,

    accessToken: null | string,
    refreshToken: null | string,
}

const initialState: IUserInitialState = {
    isLoggedIn: false,
    email: '',
    name: '',
    password: '',

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

export function getInitialState(): IUserInitialState {
    const initialUser = localStorage.getItem('user');
    const token = getAccessToken();
    const refreshToken = getRefreshToken();

    if (initialUser && token && refreshToken) {
        const user = JSON.parse(initialUser);
        const parsedToken = parseToken(token);

        // Переводим формат времени ISO в локальный для юзера
        if (parsedToken?.exp && Date.now() > parsedToken.exp * 1000) {
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return initialState;
        }

        return {
            ...initialState,
            ...user,
            isLoggedIn: true,
            accessToken: token,
            refreshToken
        }
    } else {
        return initialState;
    }
}

export const userReducer = (state = initialState, action: TUserActionTypes): IUserInitialState => {
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
        case SET_USER: {
            const payload = action.payload || {}

            return {
                ...state,
                isLoggedIn: true,
                ...payload,
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
            const payload = action.payload || {}

            return {
                ...state,
                ...payload,
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