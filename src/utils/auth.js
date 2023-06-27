import { useDispatch, useSelector } from "react-redux";
import { getUserRequest, loginRequest, logoutRequest } from "./api";
import { deleteCookie, setCookie } from "./cookie";
import { setUser } from "../services/actions/user";

export function useProvideAuth() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const getUser = async () => {
        return await getUserRequest()
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(setUser());
                }
                return data.success;
            });
    };

    const signIn = async (form) => {
        const data = await loginRequest(form)
            .then((res) => {
                let authToken;
                res.headers.forEach((header) => {
                    if (header.indexOf("Bearer") === 0) {
                        authToken = header.split("Bearer ")[1];
                    }
                });
                if (authToken) {
                    setCookie("token", authToken);
                }
            })
    }
}