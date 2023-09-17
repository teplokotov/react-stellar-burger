import React from 'react';
import styles from './app.module.css';
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import { OPEN_MODAL } from '../../services/actions/modal';

// Components
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
//import { OnlyAuth, OnlyUnAuth } from "./protected-route";

// Pages
import Home from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import NotFound404 from '../../pages/not-found-404';
import Ingredient from '../../pages/ingredient/ingredient';

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  const typeOfModal = useSelector((store) => store.modal.typeOfModal);

  React.useEffect(() => {
    background && dispatch({
      type: OPEN_MODAL,
      typeOfModal: 'ingredient',
    });
  }, [background, dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ingredients/:id" element={<Ingredient />} />
        <Route path="*" element={<NotFound404 />} />
        {/* <Route path="/login" element={<OnlyUnAuth component={<Login/>} />} /> */}
        {/* <Route path="/profile" element={<OnlyAuth component={<Profile/>} />} /> */}
      </Routes>

      {background && <Routes>
        <Route path="/ingredients/:id" element={
          typeOfModal === 'ingredient' && <Modal><IngredientDetails /></ Modal>
        } />
      </Routes>}

      {typeOfModal === 'order' && <Modal><OrderDetails/></ Modal>}

    </div>
  );
}

export default App;
