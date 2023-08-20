import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd'
import { CurrentBun } from '../CurrentBun';
import styles from './burgerConstructor.module.css';
import { Modal } from '../Modal';
import { OrderDetails } from '../OrderDetails';

import { ConstructorElementWrapper } from '../ConstructorElementWrapper';
import { useAppDispatch, useAppSelector } from '../../services/store';

import { fetchOrderThunk } from '../../services/redux/actions/orderDetails';
import { UPDATE_ORDER_NUMBER } from '../../services/redux/actions/orderDetails';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../services/redux/types/types';

type TMapIngredients = Record<string, TIngredient>

const totalPrice = (data: (TIngredient[])) => {
    const filteredIngredients = data.filter(Boolean);

    if (!filteredIngredients.length) {
        return 0;
    }

    return filteredIngredients.reduce((total, { price }) => total + price, 0)
}

export const BurgerConstructor: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector((store) => store.user.isLoggedIn)
    const orderNumber = useAppSelector((store) => store.orderDetails.order)
    const hasOrderError = useAppSelector((store) => store.orderDetails.error)
    const selectedIgredientsIds = useAppSelector((store) => store.burgerConstructor.ingredients)
    const isOrderLoading = useAppSelector((store) => store.orderDetails.loading)
    const allIgredients = useAppSelector((store) => store.ingredients.ingredients.reduce((acc: TMapIngredients, item: TIngredient) => {
        acc[item._id] = item;

        return acc;
    }, {} as TMapIngredients))

    const selectedBunId = useAppSelector((store) => store.burgerConstructor.bun)
    const [, drop] = useDrop(() => ({
        accept: 'ingredientItem',
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const selectedBun = allIgredients[selectedBunId || ''];
    const ingredientsList = selectedIgredientsIds.map((ingredient) => {
        const ingredientData = allIgredients[ingredient.id];
        return {
            ...ingredientData,
            uniqId: ingredient.uniqId
        }
    })

    const handleClick = async () => {
        if (isLoggedIn) {
            dispatch(fetchOrderThunk());
        } else {
            navigate('/login');
        }
    }

    return (
        <div className='container pt-25'>
            <CurrentBun
                bun={selectedBun}
            >
                <div
                    data-test="drop-area"
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
                    <CurrencyIcon type='primary' />
                </div>
                <Button disabled={!(selectedBun && ingredientsList.length)} htmlType="button" type="primary" size="medium" onClick={handleClick} data-test="checkout">
                    {isOrderLoading ? 'Идет загрузка' : 'Оформить заказ'}
                </Button>
            </div>
            {!!(orderNumber) && (
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
