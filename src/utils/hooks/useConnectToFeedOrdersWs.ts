import { useEffect } from "react";
import { WS_URL } from "../constants";
import { wsConnectionClosed, wsConnectionStart } from "../../services/redux/actions/ordersFeed";
import { useAppDispatch, useAppSelector } from "../../services/store";

export function useConnectToFeedOrdersWs() {
    const dispatch = useAppDispatch()
    const alreadyConnected = useAppSelector(state => state.feedOrders.wsConnected)

    useEffect(() => {
        if (alreadyConnected) {
            return;
        }

        dispatch(wsConnectionStart(`${WS_URL}/orders/all`));

        return () => {
            dispatch(wsConnectionClosed())
        }
    }, [dispatch])
}