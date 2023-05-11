import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrentBun } from '../CurrentBun';
import { IngredientShape } from '../../utils/constants';
import styles from './burgerConstructor.module.css';
import { Modal } from '../Modal';
import { OrderDetails } from '../OrderDetails';

export const BurgerConstructor = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const defaultBun = data.find(({ type }) => type === 'bun')
    if (typeof defaultBun == 'undefined') {
        return <div>Идет загрузка...</div>
    }

    return (
        <div className='container pt-25'>
            <CurrentBun
                bun={defaultBun}
            >
                <div className={`${styles.container}`}>
                    {data.filter((item) => {
                        return item.type === 'bun' ? false : true;
                    }).map((item) => (
                        <div className={`${styles.row} pr-2`} key={item._id}>
                            <div className="mr-2">
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                isLocked={false}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image_mobile}
                            />
                        </div>
                    ))}
                </div>
            </CurrentBun>
            <div className={`${styles.wrapper} text text_type_digits-default mb-1 pt-10`}>
                <div className={`${styles.sum} mr-10`}>
                    <span className='text text_type_digits-medium'>810</span>
                    <CurrencyIcon />
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={() => setIsModalOpen(true)}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen && (
                <Modal
                    onClose={() => {
                        setIsModalOpen(false)
                    }}
                >
                    <OrderDetails
                        orderId={'034536'}
                    />
                </Modal>
            )}
        </div>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(IngredientShape)
}