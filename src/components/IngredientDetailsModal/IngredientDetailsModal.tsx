import React from 'react';
import { useAppSelector } from "../../services/store"
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../Modal";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { TIngredient } from '../../services/types/types';

export const IngredientDetailsModal: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const ingredient = useAppSelector((store) => {
        return store.ingredients.ingredients.find((ingredient: TIngredient) => ingredient._id === params.id)
    });

    if (!ingredient) {
        return null;
    }

    return (
        <Modal
            onClose={() => {
                navigate('/')
            }}
            title='Детали ингридиента'
        >
            {ingredient && (
                <IngredientDetails
                    image={ingredient.image}
                    name={ingredient.name}
                    proteins={ingredient.proteins}
                    fat={ingredient.fat}
                    carbohydrates={ingredient.carbohydrates}
                    calories={ingredient.calories}
                />
            )}
        </Modal>
    )
}