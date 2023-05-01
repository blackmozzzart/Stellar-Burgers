import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredientItem.module.css';

export const IngredientItem = ({ image, counter, price, text }) => {
    return (
        <div className={styles.container}>
            <img src={image} className={`${styles.image} ml-4 mr-4`} alt='ingredient' />
            {counter && <Counter count={counter} size='default' extraClass={`${styles.counter} text text_type_digits-default`} />}
            <div className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>
                <span className='mr-2'>{price}</span>
                <CurrencyIcon />
            </div>
            <span className={`${styles.text} text text_type_main-default`}>{text}</span>
        </div>
    )
}
