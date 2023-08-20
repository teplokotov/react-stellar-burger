import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './app.module.css';
import { APIconfig, ingredientsTypes } from '../../utils/constants';
import { getIngredient } from '../../utils/utils';
import { IngredientsContext } from '../../services/appContext';
// import { OrderContext } from '../../services/orderContext';
import { loadData } from '../../services/actions';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

const totalPriceInitialState = { total: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { total: state.total + action.payload };
    case 'remove':
      return { total: state.total - action.payload };
    case 'clearAll':
      return totalPriceInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [hasError, setHasError] = React.useState(false);
  // const [data, setData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [typeOfModal, setTypeOfModal] = React.useState();
  //const [currentId, setCurrentId] = React.useState();
  const [cart, setCart] = React.useState({ bun: null, fillings: [] });
  const [totalPriceState, totalPriceDispatcher] = React.useReducer(reducer, totalPriceInitialState);
  //const [numOfOrder, setNumOfOrder] = React.useState();

  // Used the recommendation: https://github.com/teplokotov/react-stellar-burger/pull/3#discussion_r1291541751
  const ingredientsСontextValue = React.useMemo(() => {
    return { cart, setCart, totalPriceState, totalPriceDispatcher };
  }, [cart, setCart, totalPriceState, totalPriceDispatcher]);

  const dispatch = useDispatch();
  const { data, isLoading, hasError } = useSelector((store) => store.data);
  const { currentId } = useSelector((store) => store.currentId);
  const { numOfOrder } = useSelector((store) => store.order);

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
                <IngredientsContext.Provider value={{ingredientsСontextValue}}>
                  <BurgerIngredients ingredientsTypes={ingredientsTypes}
                                     onClick={() => [setShowModal(true), setTypeOfModal('ingredient')]}/>
                  {/* <OrderContext.Provider value={{numOfOrder, setNumOfOrder}}> */}
                    <BurgerConstructor onClick={() => [setShowModal(true), setTypeOfModal('order')]} />
                  {/* </OrderContext.Provider> */}
                </IngredientsContext.Provider>
              </>
            )
        }

      </main>
      {
        <Modal onClose={() => setShowModal(false)}
               isHidden={!showModal}
               heading={typeOfModal === 'ingredient' ? 'Детали ингредиента' : ''}>
              {typeOfModal === 'ingredient' && <IngredientDetails ingredient={getIngredient(data, currentId)}/>}
              {typeOfModal === 'order' && <OrderDetails numOfOrder={numOfOrder}/>}
        </ Modal>
      }
    </div>
  );
}

export default App;
