import React, { useEffect, useState } from 'react';
import { INGREDIENTS_URL } from '../../utils/constants';
import { AppHeader } from '../AppHeader';
import { BurgerConstructor } from '../BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app.module.css';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  })

  useEffect(() => {
    const fetchData = async () => {
      setState((prevState) => ({
        ...prevState,
        hasError: false,
        isLoading: true
      }))
      const res = await fetch(INGREDIENTS_URL)
      const data = await res.json()
      setState((prevState) => ({
        ...prevState,
        data: data.data,
        isLoading: false
      }))
    }
    fetchData()
      .catch(
        (error) => setState((prevState) => ({
          ...prevState,
          hasError: true,
          isLoading: false
        }))
      )
  }, [])

  return (
    <div className="App">
      <AppHeader />
      {state.hasError ? (
        <section className={styles.section}>
          <h1 className="text text_type_main-large">Что-то пошло не так :(</h1>
          <p className="text text_type_main-medium">В приложении произошла ошибка. Пожалуйста, перезагрузите страницу</p>
          <Button htmlType="button" type="primary" size="medium" onClick={() => { window.location.reload() }}>
            Обновить страницу
          </Button>
        </section>
      ) : (
        <main className={`container ${styles.columns}`}>
          <BurgerIngredients data={state.data} />
          <BurgerConstructor data={state.data} />
        </main>
      )}
    </div>
  );
}

export default App;
