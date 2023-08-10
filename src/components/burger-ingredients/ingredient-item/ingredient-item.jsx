import React from 'react';
import ingredientItemStyles from './ingredient-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext } from '../../../services/appContext';
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from "prop-types";

IngredientItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
  onClick: PropTypes.func.isRequired,
  // setCurrentId: PropTypes.func.isRequired,
};

function IngredientItem({ ingredient, onClick }) {

  const {setCurrentId, cart, setCart} = React.useContext(IngredientsContext);

  function addToCart(ingredient){
    if (ingredient.type !== 'bun') {
      setCart({
        bun: cart.bun,
        fillings: [
          ...cart.fillings,
          ingredient._id
         ],
      });
    } else {
      setCart({
        bun: ingredient._id,
        fillings: [...cart.fillings],
      });
    }
  }

  function handleOnClick() {
    // Temporarily disabled
    //onClick();

    setCurrentId(ingredient._id);
    addToCart(ingredient);

    console.log(ingredient);
  }

  return (
    <li className={ingredientItemStyles.item} onClick={handleOnClick}>
      <Counter extraClass={ingredientItemStyles.hide} count={1} size="default" />
      <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
      <p className={`${ingredientItemStyles.price} text text_type_digits-default`}>
        {ingredient.price}<CurrencyIcon type="primary" />
      </p>
      <p className={`${ingredientItemStyles.name} text text_type_main-default`}>
        {ingredient.name}
      </p>
    </li>
  );
}

export default IngredientItem;
