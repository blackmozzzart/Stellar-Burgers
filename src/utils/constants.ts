import PropTypes from 'prop-types';

export const IngredientShape = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
})

export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const INGREDIENTS_URL = `${BASE_URL}/ingredients`;
export const ORDERS_URL = `${BASE_URL}/orders`;
export const unauthorizedError = 401;
export const tokenExpiredError = 403;

export const WS_URL = 'wss://norma.nomoreparties.space';
export const ALL_ORDERS_URL = 'wss:/norma.nomoreparties.space/orders/all';
export const USER_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';

// ROUTES
export const ROUTE_LOGIN = '/login';
export const ROUTE_REGISTER = '/register';
export const ROUTE_FORGOT_PASSWORD = '/forgot-password';
export const ROUTE_RESET_PASSWORD = '/reset-password';
export const ROUTE_PROFILE = '/profile';
export const ROUTE_ORDERS = `${ROUTE_PROFILE}/orders`;
export const ROUTE_FEED = '/feed';
export const ROUTE_INGREDIENTS_ID = '/ingredients/:id';
export const ROUTE_NOT_FOUND = '*';