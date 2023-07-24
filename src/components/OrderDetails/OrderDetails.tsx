import React from 'react';
import image from '../../images/done.svg';
import styles from './orderDetails.module.css';

interface OrderDetailsProps {
    orderId: number;
}

export const OrderDetails: React.FC<OrderDetailsProps> = (props) => {
    return (
        <div className={styles.container}>
            <p className={`${styles.orderId} text text_type_digits-large pt-9`}>{props.orderId}</p>
            <p className='text text_type_main-medium pt-8 pb-15'>идентификатор заказа</p>
            <img className={styles.image} src={image} alt='заказ готовится' />
            <p className='text text_type_main-default pt-15 pb-2'>Ваш заказ начали готовить</p>
            <p className={`${styles.description} text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}