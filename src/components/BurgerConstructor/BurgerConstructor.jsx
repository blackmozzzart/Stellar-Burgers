import { useDispatch } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd'
import { CurrentBun } from '../CurrentBun';
import styles from './burgerConstructor.module.css';
import { Modal } from '../Modal';
import { OrderDetails } from '../OrderDetails';

import { ConstructorElementWrapper } from '../ConstructorElementWrapper';
import { useAppSelector } from '../../services/store';

import { fetchOrderThunk } from '../../services/actions/orderDetails';
import { UPDATE_ORDER_NUMBER } from '../../services/actions/orderDetails';

const totalPrice = (data) => {
    const filteredIngredients = data.filter(Boolean);

    if (!filteredIngredients.length) {
        return 0;
    }

    return filteredIngredients.reduce((total, { price }) => total + price, 0)
}

export const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const orderNumber = useAppSelector((store) => store.orderDetails.order)
    const hasOrderError = useAppSelector((store) => store.orderDetails.error)
    const selectedIgredientsIds = useAppSelector((store) => store.burgerConstructor.ingredients)
    const isOrderLoading = useAppSelector((store) => store.orderDetails.loading)
    const allIgredients = useAppSelector((store) => store.ingredients.ingredients.reduce((acc, item) => {
        acc[item._id] = item;

        return acc;
    }, {}))
    const selectedBunId = useAppSelector((store) => store.burgerConstructor.bun)
    const [, drop] = useDrop(() => ({
        accept: 'ingredientItem',
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const selectedBun = allIgredients[selectedBunId];
    const ingredientsList = selectedIgredientsIds.map((ingredient) => {
        const ingredientData = allIgredients[ingredient.id];
        return {
            ...ingredientData,
            uniqId: ingredient.uniqId
        }
    })

    const handleClick = async () => {
        dispatch(fetchOrderThunk());
    }

    return (
        <div className='container pt-25'>
            <CurrentBun
                bun={selectedBun}
            >
                <div
                    className={`${styles.container} ${styles.dropTarget}`}
                    ref={drop}
                >
                    {!ingredientsList.length && (
                        <div>
                            <h2 className='text text_type_main-medium mb-6'>
                                Вы ещё не выбрали ни одного продукта
                            </h2>
                            <p className='text text_type_main-medium mb-6'>
                                Перетащите ингредиенты для формирования заказа
                            </p>
                        </div>
                    )}
                    {ingredientsList.map((item, index) => (
                        <ConstructorElementWrapper
                            key={item.uniqId}
                            ingredient={item}
                            index={index}
                        />
                    ))}
                </div>
            </CurrentBun>
            <div className={`${styles.wrapper} text text_type_digits-default mb-1 pt-10`}>
                <div className={`${styles.sum} mr-10`}>
                    <span className='text text_type_digits-medium'>
                        {totalPrice([selectedBun, selectedBun, ...ingredientsList])}
                    </span>
                    <CurrencyIcon />
                </div>
                <Button disabled={!(selectedBun && ingredientsList.length)} htmlType="button" type="primary" size="medium" onClick={handleClick}>
                    {isOrderLoading ? 'Идет загрузка' : 'Оформить заказ'}
                </Button>
            </div>
            {Boolean(orderNumber) && (
                <Modal
                    onClose={() => {
                        dispatch({ type: UPDATE_ORDER_NUMBER, payload: null })
                    }}
                >
                    {hasOrderError ?
                        <p className='text text_type_main-medium mb-6'>Не получилось создать заказ, повторите снова.</p> :
                        <OrderDetails
                            orderId={orderNumber}
                        />
                    }
                </Modal>
            )}
        </div>
    )
}

BurgerConstructor.propTypes = {
}
