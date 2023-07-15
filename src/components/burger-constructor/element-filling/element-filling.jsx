import elementFillingStyles from './element-filling.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { getProp } from '../../../utils/utils'

function ElementFilling({ ingredients, id }) {
  return (
    <>
      <li className={`${elementFillingStyles.filling}`}>
        <ConstructorElement
          text={getProp(ingredients, id, 'name')}
          price={getProp(ingredients, id, 'price')}
          thumbnail={getProp(ingredients, id, 'image')}
        />
      </li>
    </>
  );
}

export default ElementFilling;
