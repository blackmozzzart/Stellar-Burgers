import React from 'react';
import { Loader } from '../Loader';
import styles from './orderHistory.module.css';
import { OrderComponent } from '../OrderComponent/OrderComponent';
import { TOrder } from '../../services/redux/types/types';
import { useAppSelector } from '../../services/store';

export const OrderHistory: React.FC = () => {
    const userOrders = useAppSelector((state) => state.feedOrders.orders)
    return (
        <ul className={styles.list}>
            <>
                {
                    userOrders.length > 0 ? (
                        <>
                            {
                                userOrders.map((order: TOrder, idx: number) => (
                                    <OrderComponent key={idx} isHistory={true} order={order} />
                                ))
                            }
                        </>
                    ) : <Loader />
                }
            </>
        </ul>
    )
}