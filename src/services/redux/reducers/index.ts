import { combineReducers } from "redux";
import { ingredientsReducer } from "./burgerIngredients";
import { orderDetailsReducer } from "./orderDetails";
import { burgerConstructorReducer } from "./burgerConstructor";
import { userReducer } from "./user";
import { ordersFeedReducer } from "./ordersFeed";
import { ordersUserReducer } from "./ordersUser";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    orderDetails: orderDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    user: userReducer,
    // orders: ordersReducer,

    feedOrders: ordersFeedReducer,
    userOrders: ordersUserReducer,
});
