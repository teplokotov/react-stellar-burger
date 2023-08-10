import ingredientsGroupStyles from './ingredients-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from "prop-types";

IngredientsGroup.propTypes = {
  groupId: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  group: PropTypes.arrayOf(ingredientPropType).isRequired,
  onClick: PropTypes.func.isRequired,
  // setCurrentId: PropTypes.func.isRequired,
};

function IngredientsGroup({ groupId, groupName, group, onClick }) {
  return (
    <>
      <h2 id={groupId} className='text text_type_main-medium'>{groupName}</h2>
      <ul className={`${ingredientsGroupStyles.group} pt-6 pb-10 pl-4`}>
        {
          group.map((item) => (
            <IngredientItem key={item._id} ingredient={item} onClick={onClick} />
          ))
        }
      </ul>
    </>
  );
}

export default IngredientsGroup;
