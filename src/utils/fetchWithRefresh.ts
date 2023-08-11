import { refreshToken } from "./api";
import { checkResponse } from "./checkResponse";
import { getAccessToken, getRefreshToken } from "./tokenHelpet";

export const fetchWithRefresh = async (url: string, options: RequestInit = {}) => {
    try {
        const accessToken = getAccessToken();

        if (!accessToken) {
            throw new Error();
        }

        const res = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'authorization': accessToken
            }
        }); //делаем запрос
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(getRefreshToken()); //обновляем токен
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken); //(или в cookies)

            const newOptions = {
                ...options,
                headers: {
                    authorization: refreshData.accessToken
                }
            };

            const res = await fetch(url, newOptions); //вызываем перезапрос данных
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};
