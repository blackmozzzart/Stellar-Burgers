import { redirect } from 'react-router-dom';
import { getUserRequest, loginRequest, logoutRequest, refreshToken, registerRequest, updateUserRequest } from "../../../utils/api";
import { AppThunkAction } from '../../store';
import { TUser } from '../types/types';
import { getRefreshToken, saveToken } from '../../../utils/tokenHelpet';

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

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

export function saveUser(user: TUser) {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user))
    }
}



export type TUserActionTypes =
    | ReturnType<typeof setUser>
    | ReturnType<typeof removeUser>
    | ReturnType<typeof registrationSuccess>
    | ReturnType<typeof registrationFailure>
    | ReturnType<typeof loginSuccess>
    | ReturnType<typeof loginFailure>
    | ReturnType<typeof logoutSuccess>
    | ReturnType<typeof logoutFailure>
    | ReturnType<typeof refreshTokenSuccess>
    | ReturnType<typeof refreshTokenFailure>
    | ReturnType<typeof getUserSuccess>
    | ReturnType<typeof getUserFailure>
    | ReturnType<typeof updateUserSuccess>
    | ReturnType<typeof updateUserFailure>

export const setUser = (email: string, name: string, password: string, accessToken: string) => ({
    type: SET_USER,
    payload: { email, name, password, accessToken }
});

export const removeUser = () => ({
    type: REMOVE_USER,
    payload: null
});

export const registrationSuccess = () => ({
    type: REGISTRATION_SUCCESS,
    payload: true
});

export const registrationFailure = () => ({
    type: REGISTRATION_FAILURE,
    payload: false
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
    payload: true
});

export const loginFailure = () => ({
    type: LOGIN_FAILURE,
    payload: false
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    payload: true
});

export const logoutFailure = () => ({
    type: LOGOUT_FAILURE,
    payload: false
});

export const refreshTokenSuccess = () => ({
    type: REFRESH_TOKEN_SUCCESS,
    payload: true
});

export const refreshTokenFailure = () => ({
    type: REFRESH_TOKEN_FAILURE,
    payload: false
});

export const getUserSuccess = () => ({
    type: GET_USER_SUCCESS,
    payload: true
});

export const getUserFailure = () => ({
    type: GET_USER_FAILURE,
    payload: false
});

export const updateUserSuccess = () => ({
    type: UPDATE_USER_SUCCESS,
    payload: true
});

export const updateUserFailure = () => ({
    type: UPDATE_USER_FAILURE,
    payload: false
});

export const registerThunk = ({ email, name, password }: TUser): AppThunkAction<Promise<void>> => (dispatch, getState) => {
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
            dispatch(setUser(data.user.email, data.user.name, data.user.password, data.accessToken))
            saveUser(data.user)
            saveToken(data)
            redirect('/')
        })
        .catch(() => {
            dispatch({
                type: REGISTRATION_FAILURE,
                payload: false
            })
        })
}

export const loginThunk = ({ email, password }: Pick<TUser, 'email' | 'password'>): AppThunkAction<Promise<void>> => async (dispatch) => {
    return loginRequest(
        email,
        password,
    )
        .then((data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: true
            })
            dispatch(setUser(data.user.email, data.user.name, password, data.accessToken))
            saveUser({ ...data.user, password })
            saveToken(data)
            redirect('/')
        })
        .catch(() => {
            dispatch({
                type: LOGIN_FAILURE,
                payload: false
            })
        })
}

export const logoutThunk = (): AppThunkAction<Promise<void>> => async (dispatch) => {
    return logoutRequest(
        getRefreshToken()
    )
        .then((data) => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: true
            })
            dispatch(removeUser())
            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        })
        .catch(() => {
            dispatch({
                type: LOGOUT_FAILURE,
                payload: false
            })
        })
}

export const refreshTokenThunk = (): AppThunkAction<Promise<void>> => async (dispatch) => {
    return refreshToken(getRefreshToken())
        .then((data) => {
            dispatch({
                type: REFRESH_TOKEN_SUCCESS,
                payload: true
            })
            saveUser(data.user)
            saveToken(data)
        })
        .catch(() => {
            console.warn('НЕ УДАЛОСЬ!!!!!!!')
            dispatch({
                type: REFRESH_TOKEN_FAILURE,
                payload: false
            })
        })
}

export const checkUserThunk = (): AppThunkAction<Promise<void>> => async (dispatch) => {
    return getUserRequest()
        .then((data) => {
            dispatch({
                type: GET_USER_SUCCESS,
                payload: true,
            })
        })
        .catch(() => {
            dispatch({
                type: GET_USER_FAILURE,
                payload: false
            })
        })
}

type User = {
    name: string,
    email: string,
    password: string
}

export const updateUserThunk = ({ name, email, password }: User): AppThunkAction<Promise<void>> => (dispatch) => {
    return updateUserRequest(
        name,
        email,
        password
    )
        .then((data) => {
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: true
            })
            dispatch(setUser(data.user.email, data.user.name, data.user.password, data.accessToken))
            saveUser(data.user)
        })
        .catch((error) => {
            dispatch({
                type: UPDATE_USER_FAILURE,
                payload: false
            })
        })
}