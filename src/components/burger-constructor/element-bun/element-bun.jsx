import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { getProp } from '../../../utils/utils'

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
