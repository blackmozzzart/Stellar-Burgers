import { TBurgerConstructorActionTypes } from "../actions/burgerConstructor";
import { TFetchIngredientsActionTypes } from "../actions/burgerIngredients";
import { TOrderActionTypes } from "../actions/orderDetails";
import { OrdersWsActions } from '../actions/ordersFeed';
import { UserOrdersWsActions } from '../actions/ordersUser';
import { TUserActionTypes } from "../actions/user";

export type TApplicationActions =
    | TBurgerConstructorActionTypes
    | TFetchIngredientsActionTypes
    | TOrderActionTypes
    | OrdersWsActions
    | UserOrdersWsActions
    | TUserActionTypes