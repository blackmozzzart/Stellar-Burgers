import React from 'react';
import styles from './orderList.module.css';
import { Loader } from '../Loader';
import { OrderComponent } from '../OrderComponent/OrderComponent';
import { TOrder, TWSOrders } from '../../services/redux/types/types';

type Props = {
    orders: readonly TWSOrders[];
    connected: boolean;
}

export const OrderList: React.FC<Props> = ({ orders, connected }) => {

    if (!connected) {
        return <Loader />
    }

    return (
        <div className={styles.main_container}>
            <div
                className={`${styles.orders_container} ingredients-container`}>
                {
                    orders?.length > 0 ? (
                        <ul className={`${styles.list} pt-6 pb-10 pr-4 pl-4`}>
                            {orders?.map((order: TOrder, idx: number) => (
                                <OrderComponent key={idx} isHistory={false} order={order} />
                            ))}
                        </ul>
                    ) : <div>У вас пока ещё нет заказов!</div>
                }
            </div>
        </div>
    );
}