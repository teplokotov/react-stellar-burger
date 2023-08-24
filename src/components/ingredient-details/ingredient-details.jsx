import ingredientDetailsStyles from './ingredient-details.module.css';
import { useSelector } from "react-redux";
import { getIngredient } from '../../utils/utils';

function IngredientDetails() {

  const { data } = useSelector((store) => store.data);
  const { currentId } = useSelector((store) => store.currentId);

  const ingredient = getIngredient(data, currentId);

  return (
    <section className={`${ingredientDetailsStyles.section}`} aria-label='Пищевая ценность'>
      <img className={ingredientDetailsStyles.image} src={ingredient.image_large} alt={ingredient.name} />
      <p className={`${ingredientDetailsStyles.name} text text_type_main-medium pt-4`}>{ingredient.name}</p>
      <ul className={`${ingredientDetailsStyles.foodValues} pt-8`}>
        <li className={ingredientDetailsStyles.foodValue}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </li>
        <li className={ingredientDetailsStyles.foodValue}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </li>
        <li className={ingredientDetailsStyles.foodValue}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </li>
        <li className={ingredientDetailsStyles.foodValue}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </section>
  );
}

export default IngredientDetails;
