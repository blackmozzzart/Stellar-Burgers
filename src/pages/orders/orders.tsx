import React from 'react';
import { OrderList } from '../../components/OrderList';
import { useAppSelector } from '../../services/store';
import { useConnectToUserOrdersWs } from '../../utils/hooks/useConnectToUserOrdersWs';

export const Orders: React.FC = () => {
    const orders = useAppSelector((state) => state.userOrders.orders);
    const connected = useAppSelector((state) => state.userOrders.wsConnected);

    useConnectToUserOrdersWs();

    return (
        <OrderList orders={orders.reverse()} connected={connected} />
    )
}