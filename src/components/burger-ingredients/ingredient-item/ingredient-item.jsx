import React from 'react';
import { useSelector } from "react-redux";
import ingredientItemStyles from './ingredient-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext } from '../../../services/appContext';
import { ingredientPropType } from '../../../utils/prop-types';
import { getProp } from '../../../utils/utils';
import PropTypes from "prop-types";

IngredientItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
  onClick: PropTypes.func.isRequired,
};

function IngredientItem({ ingredient, onClick }) {

  const { ingredientsСontextValue } = React.useContext(IngredientsContext);
  const { setCurrentId, cart, setCart, totalPriceDispatcher } = ingredientsСontextValue;

  const { data: ingredients } = useSelector((store) => store.data);

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

  function updateTotal(ingredients, ingredient){
    if (ingredient.type !== 'bun') {
      totalPriceDispatcher({ type: 'add', payload: ingredient.price });
    } else {
      if (cart.bun !== null) totalPriceDispatcher({
        type: 'remove',
        payload: getProp(ingredients, cart.bun, 'price') * 2 // Previus price of bun
      });
      totalPriceDispatcher({ type: 'add', payload: ingredient.price * 2 });
    }
  }

  function handleOnClick() {
    // Temporarily disabled
    //onClick();

    setCurrentId(ingredient._id);
    addToCart(ingredient);
    updateTotal(ingredients, ingredient);
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
