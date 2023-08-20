import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import burgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ElementBun from './element-bun/element-bun';
import ElementFilling from './element-filling/element-filling';
import { IngredientsContext } from '../../services/appContext';
import { postOrder } from '../../services/actions/exchangingOrderDetails';
//import { OrderContext } from '../../services/orderContext';
import { APIconfig } from '../../utils/constants';
import { sendOrderToServer } from '../../utils/api';
import PropTypes from "prop-types";

BurgerConstructor.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function BurgerConstructor({ onClick }) {

  const dispatch = useDispatch();

  const { ingredientsСontextValue } = React.useContext(IngredientsContext);
  const { totalPriceState } = ingredientsСontextValue;

  const { data: ingredients } = useSelector((store) => store.data);
  const { cart } = useSelector((store) => store.cart);

  //const { setNumOfOrder } = React.useContext(OrderContext);

  const fillings = cart.fillings;
  const bun = cart.bun;
  //const fillings = ["643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa0941"];
  //const bun = "643d69a5c3f7b9001cfa093c";

  function handleOnClick() {
    //const convertedCart = [bun, fillings, bun].flat();
    // bun !== null && sendOrderToServer(APIconfig, convertedCart)
    //     .then((data) => {
    //       if(data.success) {
    //         setNumOfOrder(data.order.number);
    //         onClick();
    //       }
    //     })
    //     .catch(err => console.log(err));

    const convertedCart = ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093c"]; // test cart
    dispatch(postOrder(convertedCart));
  }

  return (
    <section className={`${burgerConstructorStyles.rightSection} pt-25`} aria-label='Оформление заказа'>
      <section className={burgerConstructorStyles.orderList} aria-label='Cостав заказа'>

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
          ) : <section className={`${burgerConstructorStyles.infoBlock} ml-8 mr-4 mt-4 mb-4 text text_type_main-default`}>Добавь начинку и соус</section>
        }

        {/* Bottom bun */}
        <ElementBun ingredients={ingredients} id={bun} position="bottom"/>

      </section>

      {/* Total */}
      <section className={`${burgerConstructorStyles.result} pt-10 mr-4`} aria-label='ИТОГО'>
        <p className={`${burgerConstructorStyles.total} text text_type_digits-medium`}>
          {totalPriceState.total}<CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={handleOnClick}>
          Оформить заказ
        </Button>
      </section>

    </section>
  );
}

export default BurgerConstructor;
