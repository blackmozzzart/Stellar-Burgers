import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredientItem.module.css';
import { useDrag } from 'react-dnd'
import { useAppDispatch } from '../../services/store';
import { ADD_INGREDIENT, SET_BURGER_BUN } from '../../services/actions/burgerConstructor';


export const IngredientItem = ({ id, image, type, counter, price, text, onClick }) => {
    const dispatch = useAppDispatch();
    const [{ isDragging }, drag] = useDrag(() => ({
        // "type" is required. It is used by the "accept" specification of drop targets.
        type: 'ingredientItem',
        // The collect function utilizes a "monitor" instance (see the Overview for what this is)
        // to pull important pieces of state from the DnD system.
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            const isBun = type === 'bun';

            if (item && dropResult) {
                dispatch({ type: isBun ? SET_BURGER_BUN : ADD_INGREDIENT, payload: id })
            }
        },
    }))

    return (
        <div
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className={styles.container}
            onClick={onClick}
        >
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

IngredientItem.propTypes = {
    image: PropTypes.string,
    counter: PropTypes.number,
    price: PropTypes.number,
    text: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string
}
