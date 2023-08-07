export type TIngredient = {
    _id: string,
    name: string,
    type: 'bun' | 'sauce' | 'main',
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    [key: string]: any,
}

export type TUser = {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}

export type TOrder = {
    createdAt: string,
    ingredients: string[],
    name: string,
    number: number,
    status: string,
    updatedAt: string,
    _id: string,
}

export type WSOrderState = {
    wsConnected: boolean, // добавил с wsReducer
    wsAllOrders: boolean,
    wsUserOrders: boolean,
    orders: TOrder[],
    userOrders: TOrder[],
    allOrdersError?: Event,
    userOrdersError?: Event,
    total: number,
    totalToday: number,
    orderInfoRequest: boolean,
    orderInfoFailed: boolean,
    orderInfo: TOrder | null,
    error?: Event;
}

export type TToken = {
    accessToken: string,
    refreshToken: string
}

export enum TWSOrdersStatus {
    CREATED = "created",
    PENDING = "pending",
    DONE = "done",
}

export type TWSOrders = {
    readonly _id: string;
    readonly ingredients: string[];
    readonly status: TWSOrdersStatus;
    readonly name: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly number: number;
};

export type TWSGetMessage = {
    readonly orders: ReadonlyArray<TWSOrders>;
    readonly total: number;
    readonly totalToday: number;
};
