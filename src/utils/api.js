import { checkResponse } from './checkResponse';
import { BASE_URL } from './constants';
import { fetchWithRefresh } from './fetchWithRefresh';

export const loginRequest = async (email, password) => {
    return await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    }).then(checkResponse)
};

export const registerRequest = async (email, name, password) => {
    return await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ email, name, password }),
    }).then(checkResponse);
}

export const forgotPasswordRequest = async (email) => {
    return await fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    }).then(checkResponse)
}
export const resetPasswordRequest = async (password, token) => {
    return await fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, token })
    }).then(checkResponse)
}

export const logoutRequest = async (refreshToken) => {
    return await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'token': refreshToken
        }),
    }).then(checkResponse)
};

export const getUserRequest = async (token) => {
    return await fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': sessionStorage.getItem('accessToken')
        },
    })
}

export const updateUserRequest = async (name, email, password) => {
    return await fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            'name': name,
            'email': email,
            'password': password,
        })
    });
}

export const refreshToken = async (refreshToken) => {
    return await fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'token': refreshToken }),
    }).then(checkResponse);
}