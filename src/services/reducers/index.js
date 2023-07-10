import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderDetailsReducer } from "./orderDetails";
import { burgerConstructorReducer } from "./burgerConstructor";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    orderDetails: orderDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    user: userReducer,
});
