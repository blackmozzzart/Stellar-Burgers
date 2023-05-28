import React, { useEffect } from 'react';
import { INGREDIENTS_URL } from '../../utils/constants';
import { AppHeader } from '../AppHeader';
import { BurgerConstructor } from '../BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

import styles from './app.module.css';
import { FETCH_INGREDIENTS_FAILURE, FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS } from '../../services/actions/ingredients';

function App() {
  const dispatch = useDispatch();
  const hasLoadingError = useSelector((store: any) => store.ingredients.error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: FETCH_INGREDIENTS_REQUEST })

        const res = await fetch(INGREDIENTS_URL)
        if (res.ok) {
          const data = await res.json()


          dispatch({ type: FETCH_INGREDIENTS_SUCCESS, payload: data.data })
        } else {
          dispatch({ type: FETCH_INGREDIENTS_FAILURE, payload: `Ошибка ${res.status}` })

          return Promise.reject(`Ошибка ${res.status}`);
        }
      } catch (e) {
        dispatch({ type: FETCH_INGREDIENTS_FAILURE, payload: true })
      }
    }

    fetchData();
  }, [dispatch])

  return (
    <div className="App">
      <AppHeader />
      {hasLoadingError ? (
        <section className={styles.section}>
          <h1 className="text text_type_main-large">Что-то пошло не так :(</h1>
          <p className="text text_type_main-medium">В приложении произошла ошибка. Пожалуйста, перезагрузите страницу</p>
          <Button htmlType="button" type="primary" size="medium" onClick={() => { window.location.reload() }}>
            Обновить страницу
          </Button>
        </section>
      ) : (
        <main className={`container ${styles.columns}`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      )}
    </div>
  );
}

export default App;
