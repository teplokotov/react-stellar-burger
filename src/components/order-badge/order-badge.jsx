import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './order-badge.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProp } from '../../utils/utils';
import { SET_CURRENT_ORDER_ID, getOrderInfo } from '../../services/actions/exchangingOrderDetails';

function OrderBadge({ orderData }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: ingredients } = useSelector((store) => store.data);

  const totalPrice = React.useMemo(() => {
    return orderData.ingredients.reduce((acc, id) => {
      return orderData.ingredients.length > 0 ? acc + getProp(ingredients, id, 'price') : 0;
    }, 0);
  }, [ingredients, orderData.ingredients]);

  function getUniqueIngredients(arr) {
    return Array.from(new Set(arr));
  };

  function handleOnClick() {
    dispatch(getOrderInfo(orderData.number));

    dispatch({
      type: SET_CURRENT_ORDER_ID,
      currentOrderID: orderData.number,
    });

    navigate('/feed/' + orderData.number, {state: { background: location }});
  }

  return (
    <li className={`${styles.orderDetails}`} onClick={handleOnClick}>
      <div className={`${styles.orderDetailsHeader}`}>
        <p className="text text_type_digits-default">#{orderData.number}</p>
        <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(orderData.createdAt)} /></p>
      </div>
      <p className="text text_type_main-medium">{orderData.name}</p>
      <div className={`${styles.orderDetailsFooter}`}>
        <ul className={`${styles.orderIngredients}`}>

          {
            getUniqueIngredients(orderData.ingredients).map((ingredientId, index, arr) => {
              return index <= 5 && (
                <li
                  key={index}
                  className={`${styles.orderIngredient}`}
                  style={{zIndex: arr.length - index}}
                >
                  <img
                    className={`${styles.orderIngredientImage}`}
                    src={getProp(ingredients, ingredientId, 'image')}
                    alt={getProp(ingredients, ingredientId, 'name')} />
                  {
                    index === 5 &&
                      <p className={`text text_type_main-default ${styles.orderIngredientCounter}`}>
                        +{arr.length - 6}
                      </p>
                  }
                </li>
              )
            })
          }
          {/* <li className={`${styles.orderIngredient}`} style={{zIndex: 6}}>
            <img className={`${styles.orderIngredientImage}`} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
          </li>
          <li className={`${styles.orderIngredient}`} style={{zIndex: 5}}>
            <img className={`${styles.orderIngredientImage}`} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
          </li>
          <li className={`${styles.orderIngredient}`} style={{zIndex: 4}}>
            <img className={`${styles.orderIngredientImage}`} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
          </li>
          <li className={`${styles.orderIngredient}`} style={{zIndex: 3}}>
            <img className={`${styles.orderIngredientImage}`} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
          </li>
          <li className={`${styles.orderIngredient}`} style={{zIndex: 2}}>
            <img className={`${styles.orderIngredientImage}`} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
          </li>
          <li className={`${styles.orderIngredient}`} style={{zIndex: 1}}>
            <img className={`${styles.orderIngredientImage}`} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
            <p className={`text text_type_main-default ${styles.orderIngredientCounter}`}>+3</p>
          </li> */}

        </ul>
        <p className={`${styles.orderDetailsPrice} text text_type_digits-default`}>{totalPrice}<CurrencyIcon type="primary" /></p>
      </div>
    </li>
  )
}

export default OrderBadge;
