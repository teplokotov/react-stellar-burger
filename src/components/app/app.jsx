import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './app.module.css';
import { APIconfig, ingredientsTypes } from '../../utils/constants';
import { getIngredient } from '../../utils/utils';
import { IngredientsContext } from '../../services/appContext';
// import { OrderContext } from '../../services/orderContext';
import { loadData } from '../../services/actions';
import { CLOSE_MODAL } from '../../services/actions/modal';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [hasError, setHasError] = React.useState(false);
  // const [data, setData] = React.useState([]);
  //const [showModal, setShowModal] = React.useState(false);
  //const [typeOfModal, setTypeOfModal] = React.useState();
  //const [currentId, setCurrentId] = React.useState();
  //const [cart, setCart] = React.useState({ bun: null, fillings: [] });
  //const [totalPriceState, totalPriceDispatcher] = React.useReducer(reducer, totalPriceInitialState);
  //const [numOfOrder, setNumOfOrder] = React.useState();

  // Used the recommendation: https://github.com/teplokotov/react-stellar-burger/pull/3#discussion_r1291541751
  // const ingredientsСontextValue = React.useMemo(() => {
  //   return { totalPriceState, totalPriceDispatcher };
  // }, [totalPriceState, totalPriceDispatcher]);

  const dispatch = useDispatch();
  const { data, isLoading, hasError } = useSelector((store) => store.data);
  const { typeOfModal } = useSelector((store) => store.modal);

  React.useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>

        {/* Loading or error messages */}
        {
          (isLoading || hasError) && (
            <p className={`${styles.loadingMessage} text text_type_main-medium`}>
              {isLoading && 'Загрузка...'}
              {hasError && 'Произошла ошибка'}
            </p>
          )
        }

        {/* Main block */}
        {
          !isLoading && !hasError && data.length &&
            (
              <>
                <BurgerIngredients ingredientsTypes={ingredientsTypes} />
                <BurgerConstructor />
              </>
            )
        }

      </main>
      {
        <Modal>
          {typeOfModal === 'ingredient' && <IngredientDetails />}
          {typeOfModal === 'order' && <OrderDetails />}
        </ Modal>
      }
    </div>
  );
}

export default App;
