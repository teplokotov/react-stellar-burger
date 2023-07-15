import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '../burger-ingredients/ingredients-group/ingredients-group';

function BurgerIngredients({ ingredients, ingredientsTypes }) {

  // Initial state of tabs (Set first tab as active)
  const [current, setCurrent] = React.useState(Object.values(ingredientsTypes)[0]);

  function scrollToHeading(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`${burgerIngredientsStyles.leftSection} ml-5`}>
      <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>

      {/* Tabs */}
      <div className={`${burgerIngredientsStyles.tabs} pt-5 pb-10`}>
        {
          Object.keys(ingredientsTypes).map((key, index) => {
            const ingredientsType = ingredientsTypes[key];
            return (
              <Tab key = {index}
                   value = {ingredientsType}
                   active = {current === ingredientsType}
                   onClick = {() => [scrollToHeading(key), setCurrent(ingredientsType)]}>{ingredientsType}
              </Tab>
            );
          })
        }
      </div>

      {/* Ingredients area */}
      <section className={`${burgerIngredientsStyles.area} custom-scroll`}>
        {
          Object.keys(ingredientsTypes).map((key, index) => {
            const ingredientsType = ingredientsTypes[key];
            const group = ingredients.filter((item) => item.type === key);
            return (
              <IngredientsGroup key = {index}
                                groupId = {key}
                                groupName = {ingredientsType}
                                group = {group} />
            );
          })
        }
      </section>

    </section>
  );
}

export default BurgerIngredients;
