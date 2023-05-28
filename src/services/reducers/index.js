import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientDetailsReducer } from "./ingredientDetails";
import { orderDetailsReducer } from "./orderDetails";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
});

