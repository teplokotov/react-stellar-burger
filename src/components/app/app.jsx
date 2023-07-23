import React from 'react';
import styles from './app.module.css';
import { url, ingredientsTypes } from '../../utils/constants';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const loadData = () => {
      setHasError(false);
      setIsLoading(true);
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setData(data.data);
          setIsLoading(false);
        })
        .catch(err => {
          setHasError(true);
          setIsLoading(false);
          console.log(err);
        });
    };
    loadData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <p className={`${styles.loadingMessage} text text_type_main-medium`}>
          {isLoading && 'Загрузка...'}
          {hasError && 'Произошла ошибка'}
        </p>
        {
          !isLoading && !hasError && data.length &&
            (
              <>
                <BurgerIngredients ingredients={data} ingredientsTypes={ingredientsTypes} />
                <BurgerConstructor ingredients={data} />
              </>
            )
        }
      </main>
    </div>
  );
}

export default App;
