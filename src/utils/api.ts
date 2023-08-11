import { TToken, TUser } from '../services/redux/types/types';
import { checkResponse } from './checkResponse';
import { BASE_URL, WS_URL } from './constants';
import { fetchWithRefresh } from './fetchWithRefresh';

export const loginRequest = async (email: string, password: string) => {
    return await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    }).then(checkResponse)
};

export const registerRequest = async (email: string, name: string, password: string): Promise<{ user: TUser, success: boolean } & TToken> => {
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

export const forgotPasswordRequest = async (email: string) => {
    return await fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    }).then(checkResponse)
}
export const resetPasswordRequest = async (passwordValue: string, codeValue: string) => {
    return await fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: passwordValue, token: codeValue })
    }).then(checkResponse)
}

export const logoutRequest = async (refreshToken: string | null) => {
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

export const getUserRequest = async () => {
    return await fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',

        },
    })
}

export const getOrderRequest = async (order_number: number) => {
    return await fetchWithRefresh(`${WS_URL}/order/${order_number}`).then(checkResponse)
}

export const updateUserRequest = async (name: string, email: string, password: string) => {
    return await fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            'name': name,
            'email': email,
            'password': password,
        })
    });
}

export const refreshToken = async (refreshToken: string | null) => {
    if (!refreshToken) return;

    return await fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'token': refreshToken }),
    }).then(checkResponse);
}