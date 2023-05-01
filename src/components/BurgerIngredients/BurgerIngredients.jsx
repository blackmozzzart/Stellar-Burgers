import React, { useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientItem } from '../IngredientItem/IngredientItem';
import styles from './burgerIngredients.module.css';

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
    const [current, setCurrent] = React.useState('bun');

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
                            active={current === category}
                            onClick={setCurrent}
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
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}