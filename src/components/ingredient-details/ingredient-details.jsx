import ingredientDetailsStyles from './ingredient-details.module.css';
import { getProp } from '../../utils/utils'

function IngredientDetails({ ingredients, currentId }) {
  return (
    <section className={`${ingredientDetailsStyles.section}`} aria-label='Пищевая ценность'>
      <img className={ingredientDetailsStyles.image} src={getProp(ingredients, currentId, 'image_large')} alt={getProp(ingredients, currentId, 'name')} />
      <p className={`${ingredientDetailsStyles.name} text text_type_main-medium pt-4`}>{getProp(ingredients, currentId, 'name')}</p>
      <ul className={`${ingredientDetailsStyles.foodValues} pt-8`}>
        <li className={ingredientDetailsStyles.foodValue}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{getProp(ingredients, currentId, 'calories')}</p>
        </li>
        <li className={ingredientDetailsStyles.foodValue}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{getProp(ingredients, currentId, 'proteins')}</p>
        </li>
        <li className={ingredientDetailsStyles.foodValue}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{getProp(ingredients, currentId, 'fat')}</p>
        </li>
        <li className={ingredientDetailsStyles.foodValue}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{getProp(ingredients, currentId, 'carbohydrates')}</p>
        </li>
      </ul>
    </section>
  );
}

export default IngredientDetails;
