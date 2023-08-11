import { TToken } from "../services/redux/types/types";

type ParsedToken = {
    id: string;
    iat: number;
    exp: number;
}

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export function parseToken(token: string): ParsedToken | null {
    try {
        return JSON.parse(atob(token.slice(7).split('.')[1]))
    } catch (_) {
        return null;
    }
}

export function saveToken(data: TToken) {
    if (data.accessToken && data.refreshToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken)
    }
}

export const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}
