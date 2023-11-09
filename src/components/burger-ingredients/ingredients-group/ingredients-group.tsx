import ingredientsGroupStyles from './ingredients-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { TIngredient } from '../../../services/types';

interface IIngredientsGroupProps {
  groupId: string;
  groupName: string;
  group: TIngredient[];
}

function IngredientsGroup({ groupId, groupName, group }: IIngredientsGroupProps) {
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
