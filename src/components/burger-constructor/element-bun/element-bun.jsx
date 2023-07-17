import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { getProp } from '../../../utils/utils'
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from "prop-types";

ElementBun.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  id: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};

function ElementBun({ ingredients, id, position }) {
  return (
    <ConstructorElement extraClass="ml-8 mr-4"
      type={position}
      isLocked={true}
      text={`${getProp(ingredients, id, 'name')} ${position === 'top' ? '(верх)' : '(низ)'}`}
      price={getProp(ingredients, id, 'price')}
      thumbnail={getProp(ingredients, id, 'image')}
    />
  );
}

export default ElementBun;
