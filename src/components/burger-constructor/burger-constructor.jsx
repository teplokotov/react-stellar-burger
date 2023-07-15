import burgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ElementBun from './element-bun/element-bun';
import ElementFilling from './element-filling/element-filling';

function BurgerConstructor({ ingredients }) {
  return (
    <section className={`${burgerConstructorStyles.rightSection} pt-25 pl-4 pr-4`} aria-label='Оформление заказа'>
      <section aria-label='Cостав заказа'>

        {/* Top bun */}
        <ElementBun ingredients={ingredients} id="60666c42cc7b410027a1a9b1" position="top"/>

        {/* Fillings */}
        <ul className={`${burgerConstructorStyles.fillings} mt-4 mb-4 custom-scroll`}>
          <ElementFilling ingredients={ingredients} id="60666c42cc7b410027a1a9b9"/>
          <ElementFilling ingredients={ingredients} id="60666c42cc7b410027a1a9b4"/>
          <ElementFilling ingredients={ingredients} id="60666c42cc7b410027a1a9bc"/>
          <ElementFilling ingredients={ingredients} id="60666c42cc7b410027a1a9bb"/>
          <ElementFilling ingredients={ingredients} id="60666c42cc7b410027a1a9bb"/>
          <ElementFilling ingredients={ingredients} id="60666c42cc7b410027a1a9bf"/>
          <ElementFilling ingredients={ingredients} id="60666c42cc7b410027a1a9bf"/>
        </ul>

        {/* Bottom bun */}
        <ElementBun ingredients={ingredients} id="60666c42cc7b410027a1a9b1" position="bottom"/>

      </section>

      {/* Total */}
      <section className={`${burgerConstructorStyles.result} pt-10 mr-4`} aria-label='ИТОГО'>
        <p className={`${burgerConstructorStyles.total} text text_type_digits-medium`}>
          610<CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </section>

    </section>
  );
}

export default BurgerConstructor;
