import React from 'react';
import styles from './orderInfo.module.css';
import { Loader } from '../Loader';
import { useAppSelector } from '../../services/store';

export const OrderInfo: React.FC = () => {
    const total = useAppSelector((state) => state.feedOrders.total)
    const totalToday = useAppSelector((state) => state.feedOrders.totalToday)
    const orders = useAppSelector((state) => state.feedOrders.orders)

    return (
        <div>
            <>
                {
                    orders.length > 0 ? (
                        <>
                            <div className={styles.order_numbers}>
                                {
                                    orders?.some((order) => order.status === 'done') && (
                                        <div className={styles.ready}>
                                            <p className="text text_type_main-medium pb-6">
                                                Готовы:
                                            </p>
                                            <div className={styles.numbers_container}>
                                                <ul className={styles.list_accent}>
                                                    {
                                                        orders?.map((order, idx) => {
                                                            if (idx < 10 && order.status === 'done') {
                                                                return (<li key={idx} className="text text_type_digits-default pb-2">
                                                                    {order.number}
                                                                </li>)
                                                            }
                                                            return null
                                                        })
                                                    }
                                                </ul>
                                                <ul className={styles.list_accent}>
                                                    {
                                                        orders?.map((order, idx) => {
                                                            if (idx >= 10 && idx < 20 && order.status === 'done') {
                                                                return (<li key={idx} className="text text_type_digits-default pb-2">
                                                                    {order.number}
                                                                </li>)
                                                            }
                                                            return null
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    orders?.some((order) => order.status === 'pending') && (
                                        <div className={styles.atWork}>
                                            <p className="text text_type_main-medium pb-6">
                                                В работе:
                                            </p>
                                            <ul className={styles.list}>
                                                {
                                                    orders?.map((order, idx) => {
                                                        if (idx < 10 && order.status === 'pending') {
                                                            return (<li key={idx} className="text text_type_digits-default pb-2">
                                                                {order.number}
                                                            </li>)
                                                        }
                                                        return null
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                            <div className={styles.all_time}>
                                <p className="text text_type_main-medium">
                                    Выполнено за все время:
                                </p>
                                <span className={`${styles.digits} text text_type_digits-large`}>{total}</span>
                            </div>
                            <div>
                                <p className="text text_type_main-medium">
                                    Выполнено за сегодня:
                                </p>
                                <span className={`${styles.digits} text text_type_digits-large`}>{totalToday}</span>
                            </div>
                        </>
                    ) : <Loader />
                }

            </>
        </div>
    );
};