import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../../components/Modal';
import { OrderComposition } from '../../components/OrderComposition';
import { useAppSelector } from '../../services/store';
import { ROUTE_FEED } from '../../utils/constants';


export const FeedModal: React.FC = () => {
    const { id } = useParams();
    const orders = useAppSelector(state => state.feedOrders);
    const currentOrder = orders.orders?.find((order) => order._id === id);
    const navigate = useNavigate();

    return (
        <Modal onClose={() => navigate(ROUTE_FEED)}>
            <OrderComposition currentOrder={currentOrder} />
        </Modal>
    );
};