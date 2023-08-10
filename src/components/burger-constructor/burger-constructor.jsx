import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ElementBun from './element-bun/element-bun';
import ElementFilling from './element-filling/element-filling';
import { IngredientsContext } from '../../services/appContext';
import PropTypes from "prop-types";

BurgerConstructor.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function BurgerConstructor({ onClick }) {

  const {data: ingredients, cart, totalPriceState } = React.useContext(IngredientsContext);

  const fillings = cart.fillings;
  const bun = cart.bun;

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
        <Button htmlType="button" type="primary" size="large" onClick={onClick}>
          Оформить заказ
        </Button>
      </section>

    </section>
  );
}

export default BurgerConstructor;
