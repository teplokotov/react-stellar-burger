import { useAppDispatch } from "../../../services/types";
import { useDrop } from "react-dnd";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import elementBunStyles from './element-bun.module.css';
import { getProp } from '../../../utils/utils'
import { ADD_BUN_TO_CART } from "../../../services/actions/cart";
import { TIngredient } from "../../../services/types";
import { v4 as uuidv4 } from 'uuid';

interface IElementBunProps {
  ingredients: TIngredient[];
  id: string | null;
  position: 'top' | 'bottom';
}

function ElementBun({ ingredients, id, position }: IElementBunProps) {

  const dispatch = useAppDispatch();

  const [{ canDrop }, dropTarget] = useDrop({
    accept: 'bun',
    drop(item: { id: string }) {
      dispatch({
        type: ADD_BUN_TO_CART,
        id: item.id,
        uuid: uuidv4(),
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
              price={Number(getProp(ingredients, id, 'price'))}
              thumbnail={String(getProp(ingredients, id, 'image'))}
            />
         </section> :
         <p ref={dropTarget}
                  className={`${elementBunStyles.infoBlock} ml-8 mr-4 text text_type_main-default`}
                  style={{borderColor}}
         >Булочка не выбрана</p>
  );
}

export default ElementBun;
