import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrentBun } from '../CurrentBun';
import { IngredientShape } from '../../utils/constants';
import styles from './burgerConstructor.module.css';

export const BurgerConstructor = ({ data }) => {
    const defaultBun = data.find(({ type }) => type === 'bun')

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
                <Button htmlType="button" type="primary" size="medium" >
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(IngredientShape)
}