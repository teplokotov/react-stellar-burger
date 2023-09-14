import styles from './app.module.css';
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

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

function App() {

  const typeOfModal = useSelector((store) => store.modal.typeOfModal);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/login" element={<OnlyUnAuth component={<Login/>} />} /> */}
        {/* <Route path="/profile" element={<OnlyAuth component={<Profile/>} />} /> */}
      </Routes>

      <Modal>
        {typeOfModal === 'ingredient' && <IngredientDetails />}
        {typeOfModal === 'order' && <OrderDetails />}
      </ Modal>

    </div>
  );
}

export default App;
