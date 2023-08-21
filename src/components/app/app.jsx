import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './app.module.css';
import { loadData } from '../../services/actions';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {

  const dispatch = useDispatch();
  const { data, isLoading, hasError } = useSelector((store) => store.data);
  const { typeOfModal } = useSelector((store) => store.modal);

  React.useEffect(() => dispatch(loadData()), [dispatch]);

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
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
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
