import React from 'react';
import elementFillingStyles from './element-filling.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { getProp } from '../../../utils/utils'
import { ingredientPropType } from '../../../utils/prop-types';
import { IngredientsContext } from '../../../services/appContext';
import PropTypes from "prop-types";

ElementFilling.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

function ElementFilling({ ingredients, id, index }) {

  const { cart, setCart } = React.useContext(IngredientsContext);

  function removeFromCart(index) {
    setCart({
      bun: cart.bun,
      fillings: [...cart.fillings.slice(0, index), ...cart.fillings.slice(index + 1)],
    });
  }

  return (
    <li className={`${elementFillingStyles.filling} pr-1`}>
      <ConstructorElement
        text={getProp(ingredients, id, 'name')}
        price={getProp(ingredients, id, 'price')}
        thumbnail={getProp(ingredients, id, 'image')}
        handleClose={() => removeFromCart(index)}
      />
    </li>
  );
}

export default ElementFilling;
