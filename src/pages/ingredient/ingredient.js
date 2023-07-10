import React from 'react';
import styles from './ingredient.module.css';
import { IngredientDetails } from '../../components/IngredientDetails';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

export const Ingredient = () => {
    const params = useParams();
    const ingredient = useAppSelector((store) => {
        return store.ingredients.ingredients.find((ingredient) => ingredient._id === params.id)
    });

    if (!ingredient) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h2 className={`${styles.title} text text_type_main-large`}>Детали ингридиента</h2>
            <IngredientDetails
                image={ingredient.image}
                name={ingredient.name}
                proteins={ingredient.proteins}
                fat={ingredient.fat}
                carbohydrates={ingredient.carbohydrates}
                calories={ingredient.calories}
            />
        </div>
    )
}