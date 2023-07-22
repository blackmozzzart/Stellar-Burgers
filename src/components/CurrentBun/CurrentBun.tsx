import React, { ReactNode } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './currentBun.module.css';
import { TIngredient } from '../../services/types/types';

interface CurrentBunProps {
    children: ReactNode;
    bun: TIngredient;
}

export const CurrentBun: React.FC<CurrentBunProps> = ({ children, bun }) => {
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
