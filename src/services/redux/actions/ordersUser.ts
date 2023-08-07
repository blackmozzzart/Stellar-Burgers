import { TWSGetMessage } from "../types/types";

export const WS_USER_ORDERS_INIT = 'WS_USER_ORDERS_INIT';
export const WS_USER_ORDERS_CONNECTION_START = 'WS_USER_ORDERS_CONNECTION_START';
export const WS_USER_ORDERS_DISCONNECTING = 'WS_USER_ORDERS_DISCONNECTING';
export const WS_USER_ORDERS_CONNECTION_SUCCESS = 'WS_USER_ORDERS_CONNECTION_SUCCESS';
export const WS_USER_ORDERS_CONNECTION_ERROR = 'WS_USER_ORDERS_CONNECTION_ERROR';
export const WS_USER_ORDERS_CONNECTION_CLOSED = 'WS_USER_ORDERS_CONNECTION_CLOSED';
export const WS_USER_ORDERS_GET_MESSAGE = 'WS_USER_ORDERS_GET_MESSAGE';

export const wsConnectionStart = (url: string) => {
    return {
        type: WS_USER_ORDERS_CONNECTION_START,
        url,
    };
};

export const wsConnectionSuccess = (event: Event) => {
    return { type: WS_USER_ORDERS_CONNECTION_SUCCESS, payload: event };
};

export const wsConnectionError = (event: Event) => {
    return { type: WS_USER_ORDERS_CONNECTION_ERROR, payload: event };
};

export const wsConnectionClosed = () => {
    return { type: WS_USER_ORDERS_CONNECTION_CLOSED };
};

export const wsGetMessage = (data: Readonly<TWSGetMessage>) => {
    return { type: WS_USER_ORDERS_GET_MESSAGE, data };
};

export const wsDisconnecting = () => {
    return { type: WS_USER_ORDERS_DISCONNECTING };
};

export type UserOrdersWsActions =
    | ReturnType<typeof wsConnectionStart>
    | ReturnType<typeof wsConnectionSuccess>
    | ReturnType<typeof wsConnectionError>
    | ReturnType<typeof wsConnectionClosed>
    | ReturnType<typeof wsGetMessage>
    | ReturnType<typeof wsDisconnecting>;
