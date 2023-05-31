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
