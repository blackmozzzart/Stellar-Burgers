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
import { Route, Routes, useLocation } from 'react-router-dom';
import { Login } from '../../pages/login/login';
import { Register } from '../../pages/register/register';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { Profile } from '../../pages/profile/profile';
import { NotFound404 } from '../../pages/not-found/not-found';
import { ProtectedRouteElement } from '../ProtectedRouteElement/ProtectedRouteElement';
import { PublicRouteElement } from '../PublicRouteElement/PublicRouteElement';
import { Ingredient } from '../../pages/ingredient/ingredient';
import { IngredientDetailsModal } from '../IngredientDetailsModal';

function App() {
  const dispatch = useAppDispatch();
  const hasLoadingError = useAppSelector((store) => store.ingredients.error);
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

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
        <Routes location={state?.backgroundLocation || location}>
          <Route path='/' element={
            <DndProvider backend={HTML5Backend}>
              <main className={`container ${styles.columns}`}>
                <BurgerIngredients />
                <BurgerConstructor />
              </main>
            </DndProvider>} />
          <Route path='/login' element={<PublicRouteElement element={<Login />} />} />
          <Route path='/register' element={<PublicRouteElement element={<Register />} />} />
          <Route path='/forgot-password' element={<PublicRouteElement element={<ForgotPassword />} />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<ProtectedRouteElement element={<Profile />} />} />
          <Route path='/ingredients/:id' element={<Ingredient />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      )}

      {Boolean(state?.backgroundLocation) && (
        <Routes>
          <Route path='/ingredients/:id' element={<IngredientDetailsModal />} />
        </Routes>
      )}
    </div >
  );
}

export default App;
