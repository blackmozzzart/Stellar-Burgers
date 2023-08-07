import React, { useEffect } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import styles from './app.module.css';
import { AppHeader } from '../AppHeader';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { BurgerConstructor } from '../BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { fetchIngredientsThunk } from '../../services/redux/actions/burgerIngredients';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import { checkUserThunk } from '../../services/redux/actions/user';
import { ROUTE_FEED, ROUTE_FORGOT_PASSWORD, ROUTE_INGREDIENTS_ID, ROUTE_LOGIN, ROUTE_NOT_FOUND, ROUTE_ORDERS, ROUTE_PROFILE, ROUTE_REGISTER, ROUTE_RESET_PASSWORD, WS_URL } from '../../utils/constants';
import { Feed } from '../../pages/feed/feed';
import { Orders } from '../../pages/orders/orders';
import { ProfileForm } from '../ProfileForm';
import { OrderComposition } from '../OrderComposition';
import { Modal } from '../Modal';
import { wsConnectionStart } from '../../services/redux/actions/ordersFeed';


function App() {
  const dispatch = useAppDispatch();
  const hasLoadingError = useAppSelector((store) => store.ingredients.error);
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchIngredientsThunk())
    dispatch(checkUserThunk())
    dispatch(wsConnectionStart(`${WS_URL}/orders/all`))
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
          <Route path={ROUTE_LOGIN} element={<PublicRouteElement element={<Login />} />} />
          <Route path={ROUTE_REGISTER} element={<PublicRouteElement element={<Register />} />} />
          <Route path={ROUTE_FORGOT_PASSWORD} element={<PublicRouteElement element={<ForgotPassword />} />} />
          <Route path={ROUTE_RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={ROUTE_PROFILE} element={<ProtectedRouteElement element={<Profile />} />}>
            <Route
              path=""
              element={<ProfileForm />}
            />
            <Route
              path="orders"
              element={<Orders />}
            />
            <Route
              path="orders/:id"
              element={<OrderComposition storeOrdersKey='userOrders' />}
            />
          </Route>
          <Route path={ROUTE_FEED}>
            <Route path="" element={<Feed />} />
            <Route path=':id' element={<OrderComposition storeOrdersKey="feedOrders" />} />
          </Route>
          <Route path={ROUTE_INGREDIENTS_ID} element={<Ingredient />} />
          <Route path={ROUTE_NOT_FOUND} element={<NotFound404 />} />
        </Routes>
      )}

      {Boolean(state?.backgroundLocation) && (
        <Routes>
          <Route path={ROUTE_INGREDIENTS_ID} element={<IngredientDetailsModal />} />
          <Route path={ROUTE_PROFILE}>
            <Route
              path="orders/:id"
              element={<Modal onClose={() => navigate(ROUTE_ORDERS)}><OrderComposition storeOrdersKey='userOrders' /></Modal>}
            />
          </Route>
          <Route path={ROUTE_FEED}>
            <Route path=':id' element={<Modal onClose={() => navigate(ROUTE_FEED)}><OrderComposition storeOrdersKey="feedOrders" /></Modal>} />
          </Route>
        </Routes>
      )}
    </div >
  );
}

export default App;
