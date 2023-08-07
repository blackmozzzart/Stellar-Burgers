import React, { useEffect } from 'react';
import { OrderList } from '../../components/OrderList';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { WS_URL } from '../../utils/constants';
import { wsConnectionStart } from '../../services/redux/actions/ordersUser';

export const Orders: React.FC = () => {
    const dispatch = useAppDispatch()

    const orders = useAppSelector((state) => state.userOrders.orders);
    const connected = useAppSelector((state) => state.userOrders.wsConnected);

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken')?.slice(7);

        dispatch(wsConnectionStart(`${WS_URL}/orders?token=${accessToken}`))
    }, [dispatch])

    return (
        <OrderList orders={orders} connected={connected} />
    )
}