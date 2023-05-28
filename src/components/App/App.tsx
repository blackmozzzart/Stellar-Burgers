import React, { useEffect } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import styles from './app.module.css';
import { AppHeader } from '../AppHeader';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { BurgerConstructor } from '../BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { fetchIngredientsThunk } from '../../services/actions/ingredients';

function App() {
  const dispatch = useAppDispatch();
  const hasLoadingError = useAppSelector((store) => store.ingredients.error);

  useEffect(() => {
    dispatch(fetchIngredientsThunk())
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
        <DndProvider backend={HTML5Backend}>
          <main className={`container ${styles.columns}`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
      )}
    </div>
  );
}

export default App;
