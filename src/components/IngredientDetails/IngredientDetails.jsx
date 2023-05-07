import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredientDetails.module.css';

export const IngredientDetails = ({ image, name, proteins, fat, carbohydrates, calories }) => {
    return (
        <div className={styles.container}>
            <img src={image} className={`${styles.image} ml-4 mr-4`} alt='ingredient' />
            <p className="text text_type_main-medium pt-4">{name}</p>
            <div className={`${styles.details} pt-8`}>
                <p className={`${styles.info} text text_type_main-default`}>Калории,ккал
                    <span className='text text_type_digits-default pt-2'>{calories}</span>
                </p>
                <p className={`${styles.info} text text_type_main-default`}>Белки, г
                    <span className='text text_type_digits-default pt-2'>{proteins}</span>
                </p>
                <p className={`${styles.info} text text_type_main-default`}>Жиры, г
                    <span className='text text_type_digits-default pt-2'>{fat}</span>
                </p>
                <p className={`${styles.info} text text_type_main-default`}>Углеводы, г
                    <span className='text text_type_digits-default pt-2'>{carbohydrates}</span>
                </p>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
}