import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientShape } from '../../utils/constants';
import styles from './currentBun.module.css';

export const CurrentBun = ({ children, bun }) => {
    const commonBunProps = {
        extraClass: 'mr-4',
        isLocked: true,
        price: bun?.price,
        thumbnail: bun?.image_mobile,
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {bun && (
                    <ConstructorElement
                        {...commonBunProps}
                        type={'top'}
                        text={`${bun.name} (верх)`}
                    />
                )}
                {children}
                {bun && (
                    <ConstructorElement
                        {...commonBunProps}
                        type={'bottom'}
                        text={`${bun.name} (низ)`}
                    />
                )}
            </div>
        </div>
    )
}

CurrentBun.propTypes = {
    children: PropTypes.element,
    bun: IngredientShape
}
