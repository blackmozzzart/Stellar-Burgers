import React, { useState } from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrentBun } from '../CurrentBun';
import styles from './burgerConstructor.module.css';
import { Modal } from '../Modal';
import { OrderDetails } from '../OrderDetails';

import { checkReponse } from '../../utils/checkResponse';
import { ORDERS_URL } from '../../utils/constants';
import { useSelector } from 'react-redux'

const totalPrice = (data) => {
    return data.reduce((total, { price }) => total + price, 0)
}

export const BurgerConstructor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [OrderNumber, setOrderNumber] = useState(null);
    const [hasError, setError] = useState(false);
    const data = useSelector(store => store.ingredients.ingredients)
    const defaultBun = data.find(({ type }) => type === 'bun')

    if (typeof defaultBun == 'undefined') {
        return <div>Идет загрузка...</div>
    }

    const ingredientsWithoutBun = data.filter((item) => {
        return item.type === 'bun' ? false : true;
    })

    const handleClick = async () => {
        await fetch(ORDERS_URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ingredients: [defaultBun, ...ingredientsWithoutBun].map(({ _id }) => {
                    return _id
                })
            })
        })
            .then(checkReponse)
            .then((data) => {
                setOrderNumber(data.order.number)
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setIsModalOpen(true)
            })
    }

    return (
        <div className='container pt-25'>
            <CurrentBun
                bun={defaultBun}
            >
                <div className={`${styles.container}`}>
                    {ingredientsWithoutBun.map((item) => (
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
                    <span className='text text_type_digits-medium'>{totalPrice([defaultBun, ...ingredientsWithoutBun])}</span>
                    <CurrencyIcon />
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen && (
                <Modal
                    onClose={() => {
                        setIsModalOpen(false)
                    }}
                >
                    {hasError ?
                        <p className='text text_type_main-medium mb-6'>Не получилось создать заказ, повторите снова.</p> :
                        <OrderDetails
                            orderId={OrderNumber}
                        />
                    }
                </Modal>
            )}
        </div>
    )
}

BurgerConstructor.propTypes = {
}