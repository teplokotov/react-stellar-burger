import React from 'react';
import { useAppDispatch } from '../../../services/types';
import { XYCoord, useDrag, useDrop } from 'react-dnd'
import elementFillingStyles from './element-filling.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { getProp } from '../../../utils/utils'
import { REMOVE_INGREDIENT_FROM_CART } from '../../../services/actions/cart';
import { TIngredient } from '../../../services/types';

interface IElementFillingProps {
  ingredients: TIngredient[];
  id: number;
  index: number;
  moveFilling: (dragIndex: number, hoverIndex: number) => void;
}

function ElementFilling({ ingredients, id, index, moveFilling }: IElementFillingProps) {

  const dispatch = useAppDispatch();

  function removeFromCart(index: number) {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CART,
      index: index,
    });
  }

  const ref = React.useRef<HTMLLIElement>(null);

  const [, dropRef] = useDrop({
    accept: 'item',
    hover(item: { index: number}, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveFilling(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  })
  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1;
  dragRef(dropRef(ref));

  return (
    <li className={`${elementFillingStyles.filling} pr-1`}
        ref={ref}
        style={{ opacity }}
    >
      <ConstructorElement
        text={String(getProp(ingredients, String(id), 'name'))}
        price={Number(getProp(ingredients, String(id), 'price'))}
        thumbnail={String(getProp(ingredients, String(id), 'image'))}
        handleClose={() => removeFromCart(index)}
      />
    </li>
  );
}

export default ElementFilling;
