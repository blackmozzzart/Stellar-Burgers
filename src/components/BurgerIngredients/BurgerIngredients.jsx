import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientItem } from '../IngredientItem/IngredientItem';
import { IngredientShape } from '../../utils/constants';
import styles from './burgerIngredients.module.css';
import { Modal } from '../Modal';
import { IngredientDetails } from '../IngredientDetails';

const categoryMap = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
}

const categoryOrderMap = {
    bun: 1,
    sauce: 2,
    main: 3,
}

export const BurgerIngredients = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentTab, setCurrentTab] = useState('bun')
    const [currentIngredient, setCurrentIngredient] = useState(null)

    const groupedData = useMemo(() => {
        const map = data.reduce((acc, item) => {
            const type = item.type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(item)
            return acc;
        }, {})

        return Object.entries(map).sort((a, b) => categoryOrderMap[a[0]] - categoryOrderMap[b[0]])
    }, [data]);

    return (
        <div className={styles.wrapper}>
            <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
            <div className={styles.tabs}>
                {groupedData.map(([category]) => (
                    <a href={`#${category}`} key={category}>
                        <Tab
                            value={category}
                            active={currentTab === category}
                            onClick={setCurrentTab}
                        >
                            {categoryMap[category]}
                        </Tab>
                    </a>
                ))}
            </div>
            <div className={styles.container}>
                {groupedData.map(([category, ingredients]) => (
                    <div key={category} id={category} className='mt-10'>
                        <h3 className='text text_type_main-medium mb-6'>
                            {categoryMap[category]}
                        </h3>
                        <div className={styles.ingredientsWrapper}>
                            {ingredients.map((ingredient) => (
                                <IngredientItem
                                    key={ingredient._id}
                                    // counter={1}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    image={ingredient.image}
                                    onClick={() => {
                                        setCurrentIngredient(ingredient)
                                        setIsModalOpen(true)
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                }}
                title='Детали ингридиента'
            >
                {currentIngredient && (
                    <IngredientDetails
                        image={currentIngredient.image}
                        name={currentIngredient.name}
                        proteins={currentIngredient.proteins}
                        fat={currentIngredient.fat}
                        carbohydrates={currentIngredient.carbohydrates}
                        calories={currentIngredient.calories}
                    />
                )}
            </Modal>
        </div>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(IngredientShape)
}