import ingredientsGroupStyles from './ingredients-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from "prop-types";

IngredientsGroup.propTypes = {
  groupId: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  group: PropTypes.arrayOf(ingredientPropType).isRequired,
};

function IngredientsGroup({ groupId, groupName, group }) {
  return (
    <section id={groupId} className='ingredientsGroup'>
      <h2 className='text text_type_main-medium'>{groupName}</h2>
      <ul className={`${ingredientsGroupStyles.group} pt-6 pb-10 pl-4`}>
        {
          group.map((item) => (
            <IngredientItem key={item._id} ingredient={item} />
          ))
        }
      </ul>
    </section>
  );
}

export default IngredientsGroup;
