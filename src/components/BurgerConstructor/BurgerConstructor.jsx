import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerConstructor.module.css';

export const BurgerConstructor = ({ data }) => {
    return (
        <div className='container pt-25'>
            <div className={`${styles.container}`}>
                {data.map((item) => (
                    <div className={`${styles.row} pr-2`}>
                        <div className="mr-2">
                            <DragIcon type="primary" />
                        </div>
                        <ConstructorElement
                            key={item._id}
                            type={item.type}
                            isLocked={false}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image_mobile}
                        />
                    </div>
                ))}
            </div>
            <div className={`${styles.wrapper} text text_type_digits-default mb-1 pt-10`}>
                <div className={`${styles.sum} mr-10`}>
                    <span className='text text_type_digits-medium'>810</span>
                    <CurrencyIcon />
                </div>
                <Button htmlType="button" type="primary" size="medium" >
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}