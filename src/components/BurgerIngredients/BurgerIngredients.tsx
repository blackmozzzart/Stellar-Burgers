import React, { useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientItem } from '../IngredientItem/IngredientItem';
import styles from './burgerIngredients.module.css';
import { InView } from 'react-intersection-observer';

import { useAppSelector } from '../../services/store';
import { groupIngredientsByCategory } from '../../utils/groupIngredientsByCategory';
import { Link, useLocation } from 'react-router-dom';

type TingredientsInConstructor = Record<string, number>

const categoryMap = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
}

export const BurgerIngredients: React.FC = () => {
    const location = useLocation();
    const [currentTab, setCurrentTab] = useState('bun')
    const ingredientsList = useAppSelector(store => store.ingredients.ingredients)
    const selectedBunId = useAppSelector(store => store.burgerConstructor.bun)

    const ingredientsInConstructor = useAppSelector((store) => store.burgerConstructor.ingredients.reduce((acc: TingredientsInConstructor, item) => {
        if (!acc[item.id]) {
            acc[item.id] = 0;
        }

        acc[item.id] += 1;
        return acc
    }, {} as TingredientsInConstructor))

    const rootRef = useRef<HTMLDivElement>(null);
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
                                    const counter = ingredientsInConstructor[ingredient._id] || (selectedBunId === ingredient._id && 1) || null;

                                    return (
                                        <Link
                                            data-test={"ingredient"}
                                            key={ingredient._id}
                                            className={styles.link}
                                            to={`/ingredients/${ingredient._id}`}
                                            state={{ backgroundLocation: location }}>
                                            <IngredientItem
                                                id={ingredient._id}
                                                text={ingredient.name}
                                                price={ingredient.price}
                                                image={ingredient.image}
                                                type={ingredient.type}
                                                counter={counter}
                                            />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </InView>
                ))}
            </div>
        </div>
    )
}

