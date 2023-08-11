import React, { useMemo } from 'react';
import styles from './orderComposition.module.css';
import { useAppSelector } from '../../services/store';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient, TOrders, TWSOrdersStatus } from '../../services/redux/types/types';
import { Loader } from '../Loader';
import { useLocation } from 'react-router-dom';

type Props = {
    currentOrder?: TOrders;
}

export const OrderComposition: React.FC<Props> = ({ currentOrder }) => {
    console.log('currentOrder: ', currentOrder)
    const { state } = useLocation();
    const openedInModal = Boolean(state?.backgroundLocation)
    const orderStatus = currentOrder && currentOrder.status === TWSOrdersStatus.DONE ? 'Выполнен' : 'Готовится';
    const orderStyle = currentOrder?.status === TWSOrdersStatus.DONE ? styles.order_status : styles.order_status_cooking

    const allIngredients = useAppSelector(state => state.ingredients.ingredients);
    const foundIngredients = currentOrder?.ingredients.map((orderIngredient) => allIngredients.find((ingredient: TIngredient) => ingredient._id === orderIngredient));

    const totalPrice = useMemo(() => {
        let sum = 0;
        foundIngredients?.forEach((ingredient: TIngredient | undefined) => {
            const orderedIngredient = allIngredients.find((orderIngredient: TIngredient) => orderIngredient?._id === ingredient?._id)
            if (orderedIngredient?.price) {
                sum += orderedIngredient.price
            }
        })
        return sum
    }, [foundIngredients, allIngredients])

    function formatDate(str: string) {
        return new Date(str).toLocaleString()
    }

    if (!currentOrder) {
        return <Loader />
    }

    return (
        <div className={`${styles.container} ${openedInModal ? '' : 'mt-30'}`}>
            <div className={styles.order_info}>
                <p className={`text text_type_digits-default pb-10 ${styles.order_number}`}>#{currentOrder?.number}</p>
                <h2 className='text text_type_main-medium pb-3'>{currentOrder?.name}</h2>
                <p className={`text text_type_main-default pb-15 ${orderStyle}`}>{orderStatus}</p>
                <p className='text text_type_main-medium pb-6'>Состав:</p>
                <ul className={styles.list}>
                    {
                        Array.from(new Set(foundIngredients))?.map((ingredient, idx) => {
                            return (
                                <li key={idx} className={styles.list_item}>
                                    <img className={styles.image} src={ingredient?.image} alt="" />
                                    <h3
                                        className={`text text_type_main-default ${styles.title}`}>{ingredient?.name}</h3>
                                    <div className={`text text_type_digits-default ${styles.item_currency}`}>
                                        <span>
                                            {
                                                foundIngredients && foundIngredients?.filter(filteredIngredient => filteredIngredient?._id === ingredient?._id).length
                                            }
                                        </span>
                                        x
                                        <div className={styles.item_currency_container}>
                                            <span>{ingredient?.price}</span>
                                            <CurrencyIcon type='primary' />
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className={styles.footer}>
                    <p className='text text_type_main-default text_color_inactive'>{formatDate(currentOrder?.createdAt)}</p>
                    <div className={styles.currency_container}>
                        <span className='text text_type_digits-default'>{totalPrice}</span>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </div>
        </div>
    );
};