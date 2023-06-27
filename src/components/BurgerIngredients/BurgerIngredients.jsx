import React, { useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientItem } from '../IngredientItem/IngredientItem';
import styles from './burgerIngredients.module.css';
import { Modal } from '../Modal';
import { IngredientDetails } from '../IngredientDetails';
import { InView } from 'react-intersection-observer';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { SET_SELECTED_INGREDIENT } from "../../services/actions/ingredientDetails";
import { groupIngredientsByCategory } from '../../utils/groupIngredientsByCategory';
import { useNavigate } from 'react-router-dom';

const categoryMap = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
}

export const BurgerIngredients = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [currentTab, setCurrentTab] = useState('bun')
    const ingredientsList = useAppSelector(store => store.ingredients.ingredients)
    const selectedBunId = useAppSelector(store => store.burgerConstructor.bun)

    const igredientsInConstructor = useAppSelector((store) => store.burgerConstructor.ingredients.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = 0;
        }

        acc[item.id] += 1;
        return acc
    }, {}))
    const selectedIgredientInfo = useAppSelector((store) => store.ingredientDetails.selectedIngredient)

    const rootRef = useRef();

    const isModalOpen = Boolean(selectedIgredientInfo)
    const groupedIngredients = useMemo(() => groupIngredientsByCategory(ingredientsList), [ingredientsList]);

    return (
        <div className={styles.wrapper}>
            <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
            <div className={styles.tabs}>
                {groupedIngredients.map(([category]) => (
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
            <div className={styles.container} ref={rootRef}>
                {groupedIngredients.map(([category, ingredients]) => (
                    <InView root={rootRef.current} key={category} threshold={0.5} onChange={(inView) => {
                        if (inView) { setCurrentTab(category) }
                    }}>
                        <div id={category} className='mt-10'>
                            <h3 className='text text_type_main-medium mb-6'>
                                {categoryMap[category]}
                            </h3>
                            <div className={styles.ingredientsWrapper}>
                                {ingredients.map((ingredient) => {
                                    // выбираем ингредиенты или булку если такой id уже есть
                                    const counter = igredientsInConstructor[ingredient._id] || (selectedBunId === ingredient._id && 1) || null;

                                    return (
                                        <IngredientItem
                                            key={ingredient._id}
                                            id={ingredient._id}
                                            text={ingredient.name}
                                            price={ingredient.price}
                                            image={ingredient.image}
                                            type={ingredient.type}
                                            counter={counter}
                                            onClick={() => {
                                                dispatch({ type: SET_SELECTED_INGREDIENT, payload: ingredient })
                                                navigate(`/ingredients/${ingredient._id}`)
                                            }}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </InView>
                ))}
            </div>
            {isModalOpen && (
                <Modal
                    onClose={() => {
                        dispatch({ type: SET_SELECTED_INGREDIENT, payload: null })
                    }}
                    title='Детали ингридиента'
                >
                    {selectedIgredientInfo && (
                        <IngredientDetails
                            image={selectedIgredientInfo.image}
                            name={selectedIgredientInfo.name}
                            proteins={selectedIgredientInfo.proteins}
                            fat={selectedIgredientInfo.fat}
                            carbohydrates={selectedIgredientInfo.carbohydrates}
                            calories={selectedIgredientInfo.calories}
                        />
                    )}
                </Modal>
            )}
        </div>
    )
}

BurgerIngredients.propTypes = {
}
