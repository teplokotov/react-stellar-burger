import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import burgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ElementBun from './element-bun/element-bun';
import ElementFilling from './element-filling/element-filling';
import { postOrder } from '../../services/actions/exchangingOrderDetails';
import { getProp } from '../../utils/utils';
import { ADD_INGREDIENT_TO_CART } from '../../services/actions/cart';

function BurgerConstructor() {

  const dispatch = useDispatch();

  const { data: ingredients } = useSelector((store) => store.data);
  const { cart } = useSelector((store) => store.cart);

  const fillings = cart.fillings;
  const bun = cart.bun;
  //const fillings = ["643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa0941"];
  //const bun = "643d69a5c3f7b9001cfa093c";

  function getFlatCart() {
    return [bun, fillings, bun].flat();
  }

  const totalPrice = React.useMemo(() => {
    return getFlatCart().reduce((acc, id) => {
      return bun ? acc + getProp(ingredients, id, 'price') : 0;
    }, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  function handleOnClick() {
    bun !== null && dispatch(postOrder(getFlatCart()));
  }

  const [{ canDrop }, dropTarget] = useDrop({
    accept: ['sauce', 'main'],
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT_TO_CART,
        id: item.id,
      });
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
    })
  });

  const borderColor = canDrop ? 'lightgreen' : '#2f2f37';

  return (
    <section className={`${burgerConstructorStyles.rightSection} pt-25`} aria-label='Оформление заказа'>
      <section className={burgerConstructorStyles.orderList} ref={dropTarget} aria-label='Cостав заказа'>

        {/* Top bun */}
        <ElementBun ingredients={ingredients} id={bun} position="top"/>

        {/* Fillings */}
        {
          fillings.length > 0 ?
          (
            <ul className={`${burgerConstructorStyles.fillings} mt-4 mb-4 custom-scroll`}>
              {
                fillings.map((filling, index) => (
                  <ElementFilling key={index} ingredients={ingredients} id={filling} index={index}/>
                ))
              }
            </ul>
          ) : <section className={`${burgerConstructorStyles.infoBlock} ml-8 mr-4 mt-4 mb-4 text text_type_main-default`}
                       style={{borderColor}}
              >Добавь начинку и соус</section>
        }

        {/* Bottom bun */}
        <ElementBun ingredients={ingredients} id={bun} position="bottom"/>

      </section>

      {/* Total */}
      <section className={`${burgerConstructorStyles.result} pt-10 mr-4`} aria-label='ИТОГО'>
        <p className={`${burgerConstructorStyles.total} text text_type_digits-medium`}>
          {totalPrice}<CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={handleOnClick} disabled={bun == null}>
          Оформить заказ
        </Button>
      </section>

    </section>
  );
}

export default BurgerConstructor;
