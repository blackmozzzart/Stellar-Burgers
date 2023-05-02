import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientShape } from '../../utils/constants';
import styles from './currentBun.module.css';

export const CurrentBun = ({ children, bun }) => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <ConstructorElement
                    extraClass='mr-4'
                    type={'top'}
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />
                {children}
                <ConstructorElement
                    extraClass='mr-4'
                    type={'bottom'}
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />
            </div>
        </div>
    )
}

CurrentBun.propTypes = {
    children: PropTypes.element,
    bun: IngredientShape
}