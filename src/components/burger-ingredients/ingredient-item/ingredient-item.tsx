import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../services/types';
import { useDrag } from "react-dnd";
import ingredientItemStyles from './ingredient-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { SET_CURRENT_ID } from '../../../services/actions/currentId';
import { useLocation, useNavigate } from 'react-router-dom';
import { TIngredient } from '../../../services/types';

interface IIngredientItemProps {
  ingredient: TIngredient;
}

function IngredientItem({ ingredient }: IIngredientItemProps) {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store.cart);

  const [, dragRef] = useDrag({
      type: ingredient.type,
      item: { id: ingredient._id },
  });

  const totalCount = React.useMemo<number>(() => {
    function getFlatCart() {
      return [cart.bun, cart.fillings, cart.bun].flat();
    }
    return getFlatCart().filter((id) => String(id) === ingredient._id).length;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  function handleOnClick() {
    dispatch({
      type: SET_CURRENT_ID,
      payload: ingredient._id,
    });

    navigate('/ingredients/' + ingredient._id, {state: { background: location }});
  }

  return (
    <li className={ingredientItemStyles.item} onClick={handleOnClick} ref={dragRef}>
      {totalCount === 0 && <Counter extraClass={ingredientItemStyles.hide} count={totalCount} size="default" />}
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
