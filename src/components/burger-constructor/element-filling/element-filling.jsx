import elementFillingStyles from './element-filling.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { getProp } from '../../../utils/utils'
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from "prop-types";

ElementFilling.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  id: PropTypes.string.isRequired,
};

function ElementFilling({ ingredients, id }) {
  return (
    <li className={`${elementFillingStyles.filling}`}>
      <ConstructorElement
        text={getProp(ingredients, id, 'name')}
        price={getProp(ingredients, id, 'price')}
        thumbnail={getProp(ingredients, id, 'image')}
      />
    </li>
  );
}

export default ElementFilling;
