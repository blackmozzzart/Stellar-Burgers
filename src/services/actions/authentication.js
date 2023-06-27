import { loginRequest, logoutRequest, refreshToken, registerRequest } from "../../utils/api";
import { removeUser, setUser } from "./user";

export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

function saveUser(data) {
    console.log(data);
    if (data.user) {
        sessionStorage.setItem('user', JSON.stringify(data.user))
    }
    sessionStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
}

export const registerThunk = (email, name, password) => (dispatch, getState) => {
    return registerRequest(
        email,
        name,
        password,
    )
        .then((data) => {
            dispatch({
                type: REGISTRATION_SUCCESS,
                payload: true
            })
            dispatch(setUser(data.user.email, data.user.name))
            saveUser(data)
        })
        .catch(() => dispatch({
            type: REGISTRATION_FAILURE,
            payload: false
        }))
}

export const loginThunk = (email, password) => (dispatch) => {
    return loginRequest(
        email,
        password,
    )
        .then((data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: true
            })
            dispatch(setUser(data.user.email, data.user.name))
            saveUser(data)
        })
        .catch(() => dispatch({
            type: LOGIN_FAILURE,
            payload: false
        }))
}

export const logoutThunk = () => (dispatch) => {
    return logoutRequest(
        localStorage.getItem('refreshToken')
    )
        .then((data) => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: true
            })
            dispatch(removeUser())
            sessionStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        })
        .catch(() => dispatch({
            type: LOGOUT_FAILURE,
            payload: false
        }))
}

export const refreshTokenThunk = () => (dispatch) => {
    return refreshToken(
        localStorage.getItem('refreshToken')
    )
        .then((data) => {
            dispatch({
                type: REFRESH_TOKEN_SUCCESS,
                payload: true
            })
            saveUser(data)
        })
        .catch(() => dispatch({
            type: REFRESH_TOKEN_FAILURE,
            payload: false
        }))
}