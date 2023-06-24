import { checkResponse } from './checkResponse';

export const loginRequest = async (email, password) => {
    return await fetch('https://norma.nomoreparties.space/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    }).then((res) => checkResponse(res));
};

export const registerRequest = async (email, name, password) => {
    return await fetch('https://norma.nomoreparties.space/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, password }),
    }).then(checkResponse);
}

// export const sendEmailRequest = async () => {
//     return await fetch('', {

//     }).then(checkResponse)
// }

export const refreshToken = async (refreshToken) => {
    return await fetch('https://norma.nomoreparties.space/api/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'token': refreshToken }),
    }).then(checkResponse);
}

export const logoutRequest = async (refreshToken) => {
    return await fetch('https://norma.nomoreparties.space/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'token': refreshToken
        }),
    }).then((res) => checkResponse(res));
};

export const getUserRequest = async (token) => {
    return await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': token,
        },
    }).then(checkResponse);
}

export const changeUserRequest = async (name, email, password, token) => {
    return await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': token
        },
        body: JSON.stringify({
            'name': name,
            'email': email,
            'password': password
        })
    }).then(checkResponse);
}