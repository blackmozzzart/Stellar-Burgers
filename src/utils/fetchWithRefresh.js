import { refreshToken } from "./api";
import { checkResponse } from "./checkResponse";

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options); //делаем запрос
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken); //(или в cookies)
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); //вызываем перезапрос данных
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};