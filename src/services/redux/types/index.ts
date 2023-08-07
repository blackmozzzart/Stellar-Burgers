import { BurgerConstructorActions } from "../actions/burgerConstructor";
import { BurgerIngredientsActions } from "../actions/burgerIngredients";
import { OrderDetailsActions } from "../actions/orderDetails";
import { OrdersWsActions } from '../actions/ordersFeed';
import { UserOrdersWsActions } from '../actions/ordersUser';

export type TApplicationActions =
    | BurgerConstructorActions
    | BurgerIngredientsActions
    | OrderDetailsActions
    | OrdersWsActions
    | UserOrdersWsActions;