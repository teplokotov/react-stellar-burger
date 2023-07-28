import burgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ElementBun from './element-bun/element-bun';
import ElementFilling from './element-filling/element-filling';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  onClick: PropTypes.func.isRequired,
};

function BurgerConstructor({ ingredients, onClick }) {
  const fillings = [
                    '643d69a5c3f7b9001cfa0944',
                    '643d69a5c3f7b9001cfa093f',
                    '643d69a5c3f7b9001cfa0947',
                    '643d69a5c3f7b9001cfa0946',
                    '643d69a5c3f7b9001cfa0946',
                    '643d69a5c3f7b9001cfa094a',
                    '643d69a5c3f7b9001cfa094a'
                   ];
  return (
    <section className={`${burgerConstructorStyles.rightSection} pt-25 pl-4 pr-4`} aria-label='Оформление заказа'>
      <section aria-label='Cостав заказа'>

        {/* Top bun */}
        <ElementBun ingredients={ingredients} id="643d69a5c3f7b9001cfa093c" position="top"/>

        {/* Fillings */}
        <ul className={`${burgerConstructorStyles.fillings} mt-4 mb-4 custom-scroll`}>
          {
            fillings.map((filling, index) => (
              <ElementFilling key={index} ingredients={ingredients} id={filling}/>
            ))
          }
        </ul>

        {/* Bottom bun */}
        <ElementBun ingredients={ingredients} id="643d69a5c3f7b9001cfa093c" position="bottom"/>

      </section>

      {/* Total */}
      <section className={`${burgerConstructorStyles.result} pt-10 mr-4`} aria-label='ИТОГО'>
        <p className={`${burgerConstructorStyles.total} text text_type_digits-medium`}>
          610<CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={onClick}>
          Оформить заказ
        </Button>
      </section>

    </section>
  );
}

export default BurgerConstructor;
