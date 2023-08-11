import React from 'react';
import { useParams } from 'react-router-dom';
import { OrderComposition } from '../../components/OrderComposition';
import { useAppSelector } from '../../services/store';


export const FeedInnerPage: React.FC = () => {
    const { id } = useParams();
    const orders = useAppSelector(state => state.feedOrders);
    const currentOrder = orders.orders?.find((order) => order._id === id);

    return (
        <OrderComposition currentOrder={currentOrder} />
    );
};