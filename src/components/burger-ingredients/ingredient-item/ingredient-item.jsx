import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import ingredientItemStyles from './ingredient-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext } from '../../../services/appContext';
import { ingredientPropType } from '../../../utils/prop-types';
import { getProp } from '../../../utils/utils';
import PropTypes from "prop-types";
import { SET_CURRENT_ID } from '../../../services/actions/currentId';
import { ADD_INGREDIENT_TO_CART, ADD_BUN_TO_CART } from '../../../services/actions/cart';

IngredientItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
  onClick: PropTypes.func.isRequired,
};

function IngredientItem({ ingredient, onClick }) {

  const dispatch = useDispatch();
  const { data: ingredients } = useSelector((store) => store.data);

  function addToCart(ingredient){
    if (ingredient.type !== 'bun') {
      dispatch({
        type: ADD_INGREDIENT_TO_CART,
        id: ingredient._id,
      });
    } else {
      dispatch({
        type: ADD_BUN_TO_CART,
        id: ingredient._id,
      });
    }
  }

  function handleOnClick() {
    dispatch({
      type: SET_CURRENT_ID,
      payload: ingredient._id,
    });
    //onClick();

    addToCart(ingredient);
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
