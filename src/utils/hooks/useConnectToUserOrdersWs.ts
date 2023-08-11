import { useEffect } from "react";
import { WS_URL } from "../constants";
import { wsConnectionClosed, wsConnectionStart } from "../../services/redux/actions/ordersUser";
import { useAppDispatch } from "../../services/store";
import { getAccessToken } from "../tokenHelpet";

export function useConnectToUserOrdersWs() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const accessToken = getAccessToken()?.slice(7);
        dispatch(wsConnectionStart(`${WS_URL}/orders?token=${accessToken}`))

        return () => {
            dispatch(wsConnectionClosed())
        }
    }, [dispatch])
}