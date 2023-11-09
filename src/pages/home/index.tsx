import React from 'react';
import styles from './home.module.css';
// Redux
import { useAppSelector } from '../../services/types';
// Drag & Drop
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
// Components
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";

function Home() {

  const { data, isLoading, hasError } = useAppSelector((store) => store.data);

  return (
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
        !isLoading && !hasError && data.length > 0 &&
          (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          )
      }

    </main>
  );
}

export default Home;
