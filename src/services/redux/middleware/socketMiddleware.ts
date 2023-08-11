import { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { TApplicationActions } from "../types";
import { TWSGetMessage } from "../types/types";
import { AppDispatch, RootState } from "../../store";

export type TWSStoreActions = {
    wsConnectionStart: string;
    wsDisconnecting: string;
    wsConnectionSuccess: (event: Event) => AnyAction;
    wsConnectionError: (event: Event) => AnyAction;
    wsConnectionClosed: () => AnyAction;
    wsGetMessage: (data: Readonly<TWSGetMessage>) => AnyAction;
}

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action: TApplicationActions) => {
            const { dispatch } = store;
            const { type } = action;
            const {
                wsConnectionStart,
                wsDisconnecting,
                wsConnectionSuccess,
                wsConnectionError,
                wsConnectionClosed,
                wsGetMessage,
            } = wsActions;


            if (type === wsConnectionStart) {
                // объект класса WebSocket
                socket = new WebSocket((action as any).url);
            }

            // функция, которая вызывается при открытии сокета
            if (socket) {
                socket.onopen = event => {
                    dispatch(wsConnectionSuccess(event));
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch(wsConnectionError(event));
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = event => {
                    const { data } = event;
                    const parseData = JSON.parse(data);
                    const { orders, total, totalToday } = parseData;


                    dispatch(wsGetMessage({ orders, total, totalToday }));
                };

                // функция, которая вызывается при закрытии соединения
                socket.onclose = () => {
                    dispatch(wsConnectionClosed());
                };
            }

            if (socket && type === wsDisconnecting) {
                socket.close();
            }

            next(action);
        };
    }) as Middleware;
};
