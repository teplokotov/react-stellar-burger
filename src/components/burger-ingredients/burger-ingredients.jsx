import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '../burger-ingredients/ingredients-group/ingredients-group';
import { ingredientsPropType } from '../../utils/prop-types';
import { IngredientsContext } from '../../services/appContext';
import PropTypes from "prop-types";

BurgerIngredients.propTypes = {
  ingredientsTypes: ingredientsPropType.isRequired,
  onClick: PropTypes.func.isRequired,
};

function BurgerIngredients({ ingredientsTypes, onClick }) {

  const { ingredientsСontextValue } = React.useContext(IngredientsContext);
  const { data: ingredients } = ingredientsСontextValue;

  // Initial state of tabs (Set first tab as active)
  const [current, setCurrent] = React.useState(Object.values(ingredientsTypes)[0]);

  const [ingredientsGroups, setIngredientsGroups] = React.useState();
  const [ingredientsArea, setIngredientsArea] = React.useState();

  function scrollToHeading(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    const ingredientsGroups = document.querySelectorAll('.ingredientsGroup');
    const ingredientsArea = document.querySelector('.ingredientsArea');
    setIngredientsGroups(ingredientsGroups);
    setIngredientsArea(ingredientsArea);
  },[]);

  function changeActiveTab(sections) {
    let currentSectionId = '';
    sections.forEach((section) => {
      if (ingredientsArea.scrollTop >= section.offsetTop - 284) currentSectionId = section.id;
    });
    setCurrent(ingredientsTypes[currentSectionId]);
  }

  return (
    <section className={`${burgerIngredientsStyles.leftSection}`}>
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
      <section className={`${burgerIngredientsStyles.area} ingredientsArea custom-scroll`}
               onScroll={() => changeActiveTab(ingredientsGroups)}>
        {
          Object.keys(ingredientsTypes).map((key, index) => {
            const ingredientsType = ingredientsTypes[key];
            const group = ingredients.filter((item) => item.type === key);
            return (
              <IngredientsGroup key = {index}
                                groupId = {key}
                                groupName = {ingredientsType}
                                group = {group}
                                onClick = {onClick}/>
            );
          })
        }
      </section>

    </section>
  );
}

export default BurgerIngredients;
