import React from 'react';
import styles from './orderComponent.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient, TOrder } from '../../services/redux/types/types';

interface IOrderComponentProps {
    order: TOrder,
    isHistory: boolean;
}

export const OrderComponent: React.FC<IOrderComponentProps> = ({ order, isHistory = false }) => {
    const location = useLocation();
    const { status, number, createdAt, name, ingredients, _id } = order;
    const orderIngredients = useAppSelector((state) => state.ingredients.ingredients)

    const findIngredient = (ingredient: string, ingredients: TIngredient[]) => {
        return ingredients.find((foundIngredient: TIngredient) => foundIngredient._id === ingredient)
    }

    const checkStatus = (status: string) => {
        if (status === 'done') {
            return 'Создан'
        }
    }

    const calculateSum = () => {
        let sum = 0;
        ingredients.forEach((ingredient: string) => {
            const find = orderIngredients.find((orderIngredient: TIngredient) => orderIngredient._id === ingredient)
            if (find?.price) {
                sum += find.price
            }
        })
        return sum
    }

    function formatDate(str: string) {
        return new Date(str).toLocaleString()
    }

    return (
        <li>
            <Link
                className={styles.link}
                to={{
                    pathname: `${location.pathname}/${_id}`,
                }}
                state={{ backgroundLocation: location }}
            >
                <div className={styles.header}>
                    <p className='text text_type_digits-default'>{`#${number}`}</p>
                    <p className='text text_type_main-default text_color_inactive'>{formatDate(createdAt)}</p>
                </div>
                <h2 className='text text_type_main-medium'>{name}</h2>
                {
                    (status && isHistory) && <p className='text text_type_main-default'>{checkStatus(status)}</p>
                }
                <div className={styles.footer}>
                    <ul className={styles.ingredients_list}>
                        {
                            ingredients.map((ingredient, index) => {
                                const foundIngredient = findIngredient(ingredient, orderIngredients)
                                if (index < 5) {
                                    return (
                                        <li key={index} className={styles.ingredients_list_item}>
                                            <img className={styles.ingredients_list_item_image} src={foundIngredient?.image}
                                                alt={foundIngredient?.name} />
                                        </li>
                                    )
                                } else if (index === 6) {
                                    return (<li key={index} className={styles.last_ingredient}>
                                        <img className={styles.last_ingredient_image} src={foundIngredient?.image}
                                            alt={foundIngredient?.name} />
                                        <div className={styles.overlay} />
                                        <span className={`text text_type_main-default ${styles.last_ingredient_count}`}>+{ingredients.length - 5}</span>
                                    </li>)
                                }
                                return null
                            }
                            )
                        }
                    </ul>
                    <div className={styles.total}>
                        <span className='text text_type_digits-default'>{calculateSum()}</span>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </Link>
        </li >
    );
};