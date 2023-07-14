import ingredientsGroupStyles from './ingredients-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';

function IngredientsGroup({ groupId, groupName, group }) {
  return (
    <>
      <h2 id={groupId} className='text text_type_main-medium'>{groupName}</h2>
      <ul className={`${ingredientsGroupStyles.group} pt-6 pb-10 pl-4`}>
        {
          group.map((item) => (
            <IngredientItem key={item._id} ingredient={item} />
          ))
        }
      </ul>
    </>
  );
}

export default IngredientsGroup;
