import React from 'react';
import { useDispatch } from "react-redux";
import elementFillingStyles from './element-filling.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { getProp } from '../../../utils/utils'
import { ingredientPropType } from '../../../utils/prop-types';
import { IngredientsContext } from '../../../services/appContext';
import { REMOVE_INGREDIENT_FROM_CART } from '../../../services/actions/cart';
import PropTypes from "prop-types";

ElementFilling.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

function ElementFilling({ ingredients, id, index }) {

  const { ingredientsСontextValue } = React.useContext(IngredientsContext);
  const { totalPriceDispatcher } = ingredientsСontextValue;

  const dispatch = useDispatch();

  function removeFromCart(index, price) {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CART,
      index: index,
    });
    // totalPriceDispatcher({ type: 'remove', payload: price });
  }

  return (
    <li className={`${elementFillingStyles.filling} pr-1`}>
      <ConstructorElement
        text={getProp(ingredients, id, 'name')}
        price={getProp(ingredients, id, 'price')}
        thumbnail={getProp(ingredients, id, 'image')}
        handleClose={() => removeFromCart(index, getProp(ingredients, id, 'price'))}
      />
    </li>
  );
}

export default ElementFilling;
