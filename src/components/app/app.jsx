import React from 'react';
import styles from './app.module.css';
import { url, ingredientsTypes } from '../../utils/constants';
import { getIngredient } from '../../utils/utils';
import { IngredientsContext } from '../../services/appContext';

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [typeOfModal, setTypeOfModal] = React.useState();
  const [currentId, setCurrentId] = React.useState();
  const [cart, setCart] = React.useState({ bun: null, fillings: [] });
  const [totalPriceState, totalPriceDispatcher] = React.useReducer(reducer, totalPriceInitialState);

  React.useEffect(() => {
    const loadData = () => {
      setHasError(false);
      setIsLoading(true);
      fetch(url)
        .then(res => {
          if (res.ok) return res.json();
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => {
          setData(data.data);
        })
        .catch(err => {
          setHasError(true);
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    };
    loadData();
  }, []);

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
                <IngredientsContext.Provider value={{data, cart, setCart, setCurrentId, totalPriceState, totalPriceDispatcher}}>
                  <BurgerIngredients ingredientsTypes={ingredientsTypes}
                                     onClick={() => [setShowModal(true), setTypeOfModal('ingredient')]}/>
                  <BurgerConstructor onClick={() => [setShowModal(true), setTypeOfModal('order')]} />
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
              {typeOfModal === 'order' && <OrderDetails/>}
        </ Modal>
      }
    </div>
  );
}

export default App;
