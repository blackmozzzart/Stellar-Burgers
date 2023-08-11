import React from 'react';
import { OrderComposition } from '../../components/OrderComposition';
import { useAppSelector } from '../../services/store';
import { ROUTE_ORDERS } from '../../utils/constants';
import { Modal } from '../../components/Modal';
import { useNavigate, useParams } from 'react-router-dom';

export const OrdersModal: React.FC = () => {
    const { id } = useParams();
    const orders = useAppSelector(state => state.userOrders);
    const currentOrder = orders.orders?.find((order) => order._id === id);
    const navigate = useNavigate();

    return (
        <Modal onClose={() => navigate(ROUTE_ORDERS)}>
            <OrderComposition currentOrder={currentOrder} />
        </Modal>
    );
};