import React from 'react';
import styles from './app.module.css';
import { useAppDispatch, useAppSelector } from '../../services/types';
import { Route, Routes, useLocation } from "react-router-dom";

import { OPEN_MODAL } from '../../services/actions/modal';
import { checkUserAuth } from '../../services/actions/userInfo';

// Components
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import UserForm from '../user-form/user-form';
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import PreloaderOrder from '../preloader-order/preloader-order';
import OrderInfoDetails from '../order-info-details/order-info-details';
import OrdersHistory from '../orders-history/orders-history';

// Pages
import Home from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import NotFound404 from '../../pages/not-found-404';
import Ingredient from '../../pages/ingredient/ingredient';
import Feed from '../../pages/feed';
import OrderInfo from '../../pages/orderInfo';
import { loadData } from '../../services/actions';

function App() {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  const typeOfModal = useAppSelector((store) => store.modal.typeOfModal);
  const isLoadingOrder = useAppSelector((store) => store.order.isLoading);

  React.useEffect(() => {
    dispatch(loadData());
  },[dispatch]);

  React.useEffect(() => {
    dispatch(checkUserAuth());
    background?.pathname === '/' && dispatch({
      type: OPEN_MODAL,
      typeOfModal: 'ingredient',
    });
    (background?.pathname === '/feed/' || background?.pathname === '/profile/orders/') && !isLoadingOrder && dispatch({
      type: OPEN_MODAL,
      typeOfModal: 'orderInfo',
    });
  }, [background, dispatch, isLoadingOrder]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} >
          <Route path="/profile/" element={<UserForm />} />
          <Route path="/profile/orders" element={<OrdersHistory />} />
        </Route>
        <Route path="/profile/orders/:id" element={<OnlyAuth component={<OrderInfo />} />} />
        <Route path="/ingredients/:id" element={<Ingredient />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:id" element={<OrderInfo />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {background && <Routes>
        <Route path="/ingredients/:id" element={
          typeOfModal === 'ingredient' && <Modal><IngredientDetails /></ Modal>
        } />
        <Route path="/feed/:id" element={
          typeOfModal === 'orderInfo' && <Modal><OrderInfoDetails isModal={true}/></ Modal>
        } />
        <Route path="/profile/orders/:id" element={
          typeOfModal === 'orderInfo' && <Modal><OrderInfoDetails isModal={true}/></ Modal>
        } />
      </Routes>}

      {typeOfModal === 'order' && <Modal><OrderDetails/></ Modal>}
      {isLoadingOrder && location.pathname === '/' && <PreloaderOrder />}

    </div>
  );
}

export default App;
