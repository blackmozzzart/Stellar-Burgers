import React from 'react';
import { useParams } from 'react-router-dom';
import { OrderComposition } from '../../components/OrderComposition';
import { useAppSelector } from '../../services/store';
import { useConnectToUserOrdersWs } from '../../utils/hooks/useConnectToUserOrdersWs';

export const UserOrdersInnerPage: React.FC = () => {
    const { id } = useParams();
    const orders = useAppSelector(state => state.userOrders);
    const currentOrder = orders.orders?.find((order) => order._id === id);

    useConnectToUserOrdersWs();

    return (
        <OrderComposition currentOrder={currentOrder} />
    );
};