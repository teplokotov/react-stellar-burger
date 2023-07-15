import styles from './app.module.css';
import { data, ingredientsTypes } from '../../utils/data';
import { ingredientPropType, ingredientsPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  ingredientsTypes: ingredientsPropType.isRequired
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={data} ingredientsTypes={ingredientsTypes} />
        <BurgerConstructor ingredients={data} />
      </main>
    </div>
  );
}

export default App;
