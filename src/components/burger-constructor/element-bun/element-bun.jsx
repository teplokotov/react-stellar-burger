import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import elementBunStyles from './element-bun.module.css';
import { getProp } from '../../../utils/utils'
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from "prop-types";
import { ADD_BUN_TO_CART } from "../../../services/actions/cart";

ElementBun.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  position: PropTypes.string.isRequired,
};

function ElementBun({ ingredients, id, position }) {

  const dispatch = useDispatch();

  const [{ canDrop }, dropTarget] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch({
        type: ADD_BUN_TO_CART,
        id: item.id,
      });
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
    })
  });

  const borderColor = canDrop ? 'lightgreen' : '#2f2f37';

  return (
    id ? <section ref={dropTarget}>
            <ConstructorElement extraClass="ml-8 mr-4"
              type={position}
              isLocked={true}
              text={`${getProp(ingredients, id, 'name')} ${position === 'top' ? '(верх)' : '(низ)'}`}
              price={getProp(ingredients, id, 'price')}
              thumbnail={getProp(ingredients, id, 'image')}
            />
         </section> :
         <section ref={dropTarget}
                  className={`${elementBunStyles.infoBlock} ml-8 mr-4 text text_type_main-default`}
                  style={{borderColor}}
         >Булочка не выбрана</section>
  );
}

export default ElementBun;
