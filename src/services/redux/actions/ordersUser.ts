import { TWSGetMessage } from "../types/types";

export const WS_USER_ORDERS_INIT = 'WS_USER_ORDERS_INIT';
export const WS_USER_ORDERS_CONNECTION_START = 'WS_USER_ORDERS_CONNECTION_START';
export const WS_USER_ORDERS_DISCONNECTING = 'WS_USER_ORDERS_DISCONNECTING';
export const WS_USER_ORDERS_CONNECTION_SUCCESS = 'WS_USER_ORDERS_CONNECTION_SUCCESS';
export const WS_USER_ORDERS_CONNECTION_ERROR = 'WS_USER_ORDERS_CONNECTION_ERROR';
export const WS_USER_ORDERS_CONNECTION_CLOSED = 'WS_USER_ORDERS_CONNECTION_CLOSED';
export const WS_USER_ORDERS_GET_MESSAGE = 'WS_USER_ORDERS_GET_MESSAGE';

type TWSConnectionStart = {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_START;
    readonly url: string;
}
type TWSConnectionSuccess = {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_SUCCESS;
    readonly payload: Event;
}

type TWSConnectionErrorAction = {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_ERROR;
    readonly payload: Event;
}

type TWSConnectionClosed = {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_CLOSED;
}

type TWSGetMessageAction = {
    readonly type: typeof WS_USER_ORDERS_GET_MESSAGE;
    readonly data: Readonly<TWSGetMessage>
}
type TWSDisconnecting = {
    readonly type: typeof WS_USER_ORDERS_DISCONNECTING;
}

export const wsConnectionStart = (url: string): TWSConnectionStart => {
    return {
        type: WS_USER_ORDERS_CONNECTION_START,
        url,
    };
};

export const wsConnectionSuccess = (event: Event): TWSConnectionSuccess => {
    return { type: WS_USER_ORDERS_CONNECTION_SUCCESS, payload: event };
};

export const wsConnectionError = (event: Event): TWSConnectionErrorAction => {
    return { type: WS_USER_ORDERS_CONNECTION_ERROR, payload: event };
};

export const wsConnectionClosed = (): TWSConnectionClosed => {
    return { type: WS_USER_ORDERS_CONNECTION_CLOSED };
};

export const wsGetMessage = (data: Readonly<TWSGetMessage>): TWSGetMessageAction => {
    return { type: WS_USER_ORDERS_GET_MESSAGE, data };
};

export const wsDisconnecting = (): TWSDisconnecting => {
    return { type: WS_USER_ORDERS_DISCONNECTING };
};

export type UserOrdersWsActions =
    | TWSConnectionStart
    | TWSConnectionSuccess
    | TWSConnectionErrorAction
    | TWSConnectionClosed
    | TWSGetMessageAction
    | TWSDisconnecting
