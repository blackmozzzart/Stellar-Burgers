import { checkResponse } from "./checkResponse";

export function request(url: string, options?: RequestInit) {
    return fetch(url, options).then(checkResponse)
}