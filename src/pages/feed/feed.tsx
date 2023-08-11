import React from 'react';
import styles from './feed.module.css';
import { OrderList } from '../../components/OrderList';
import { OrderInfo } from '../../components/OrderInfo';
import { useAppSelector } from '../../services/store';

export const Feed: React.FC = React.memo(() => {
    const orders = useAppSelector((state) => state.feedOrders.orders);
    const connected = useAppSelector((state) => state.feedOrders.wsConnected);

    return (
        <div className='container'>
            <h1 className='mt-10 mb-5 text text_type_main-large'>Лента заказов</h1>
            <div className={styles.container}>
                <OrderList orders={orders} connected={connected} />
                <OrderInfo />
            </div>
        </div>
    )
})