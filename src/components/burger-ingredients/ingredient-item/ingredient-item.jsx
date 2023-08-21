import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import ingredientItemStyles from './ingredient-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../../utils/prop-types';
import { SET_CURRENT_ID } from '../../../services/actions/currentId';
import { ADD_INGREDIENT_TO_CART, ADD_BUN_TO_CART } from '../../../services/actions/cart';
import { OPEN_MODAL } from '../../../services/actions/modal';

IngredientItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

function IngredientItem({ ingredient }) {

  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cart);

  const totalCount = React.useMemo(() => {
    function getFlatCart() {
      return [cart.bun, cart.fillings, cart.bun].flat();
    }
    return getFlatCart().filter((id) => id === ingredient._id).length;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

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

    dispatch({
      type: OPEN_MODAL,
      typeOfModal: 'ingredient',
    });

    addToCart(ingredient);
  }

  return (
    <li className={ingredientItemStyles.item} onClick={handleOnClick}>
      {/* <Counter extraClass={ingredientItemStyles.hide} count={1} size="default" /> */}
      <Counter count={totalCount} size="default" />
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
