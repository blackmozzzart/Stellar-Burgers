export type TIngredient = {
    _id: string;
    name: string;
    type: 'bun' | 'sauce' | 'main';
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    [key: string]: any;
}

export type TUser = {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}

export type TOrders = {
    readonly createdAt: string;
    readonly ingredients: string[];
    readonly name: string;
    readonly number: number;
    readonly status: TWSOrdersStatus;
    readonly updatedAt: string;
    readonly _id: string;
}

export type WSOrderState = {
    wsConnected: boolean;
    wsAllOrders: boolean;
    wsUserOrders: boolean;
    orders: TOrders[];
    userOrders: TOrders[];
    allOrdersError?: Event;
    userOrdersError?: Event;
    total: number;
    totalToday: number;
    orderInfoRequest: boolean;
    orderInfoFailed: boolean;
    orderInfo: TOrders | null;
    error?: Event;
}

export type TToken = {
    accessToken: string;
    refreshToken: string;
}

export enum TWSOrdersStatus {
    CREATED = "created",
    PENDING = "pending",
    DONE = "done",
}

export type TWSGetMessage = {
    readonly orders: TOrders[];
    readonly total: number;
    readonly totalToday: number;
};

export type TRequestData = {
    readonly success: boolean;
    readonly message: string;
};
