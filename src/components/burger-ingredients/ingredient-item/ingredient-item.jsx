import ingredientItemStyles from './ingredient-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientItem({ ingredient }) {
  return (
    <>
      <li key={ingredient._id} className={ingredientItemStyles.item}>
        <Counter extraClass={ingredientItemStyles.hide} count={1} size="default" />
        <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
        <p className={`${ingredientItemStyles.price} text text_type_digits-default`}>
          {ingredient.price}<CurrencyIcon type="primary" />
        </p>
        <p className={`${ingredientItemStyles.name} text text_type_main-default`}>
          {ingredient.name}
        </p>
      </li>
    </>
  );
}

export default IngredientItem;