import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './orderInfo.module.css';
import { useParams } from 'react-router-dom';
import { getOrderInfo } from '../../services/actions/exchangingOrderDetails';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getProp } from '../../utils/utils';
import { loadData } from '../../services/actions';
import { orderStatuses } from '../../utils/constants';

function OrderInfo() {

  const dispatch = useDispatch();

  const { id } = useParams();
  const { data: ingredients } = useSelector((store) => store.data);
  const { orderInfo, isLoading, hasError } = useSelector((store) => store.order);

  function getOrderIngredients() {
    const uniqueIds = Array.from(new Set(orderInfo[0].ingredients));
    const result = { ids: [], total: 0 };
    uniqueIds.forEach((id) => {
      result['ids'][id] = {
        'image': getProp(ingredients, id, 'image'),
        'name': getProp(ingredients, id, 'name'),
        'count': orderInfo[0].ingredients.reduce((acc, item) => acc += item === id ? 1 : 0, 0),
        'price': getProp(ingredients, id, 'price'),
      };
    });
    result['total'] = orderInfo[0].ingredients.reduce((acc, item) => acc += getProp(ingredients, item, 'price'), 0);
    return result;
  };

  React.useEffect(() => {
    dispatch(getOrderInfo(id));
    dispatch(loadData());
  },[dispatch, id]);

  return (
    <main className={styles.main}>

      {/* Loading or error messages */}
      {
        (isLoading || hasError || orderInfo.length === 0) && (
          <p className="text text_type_main-medium">
            {isLoading && 'Загрузка...'}
            {hasError && 'Произошла ошибка...'}
            {!isLoading && !hasError && orderInfo.length === 0 && '🔎 Заказ не найден...'}
          </p>
        )
      }

      {/* Main block */}
      {
        !isLoading && !hasError && orderInfo.length > 0 && ingredients.length > 0 &&
          (
            <section className={`${styles.orderInfoSection}`}>
              <p className={`${styles.orderNumber} text text_type_digits-default`}>#{orderInfo[0].number}</p>
              <h1 className="text text_type_main-medium pt-10">{orderInfo[0].name}</h1>
              <p className="text text_type_main-default pt-3"
                 style={{color: orderStatuses[orderInfo[0].status]['color']}}
              >{orderStatuses[orderInfo[0].status]['text']}</p>
              <h2 className="text text_type_main-medium pt-15">Состав:</h2>
              <section className={`${styles.ingredientsArea} custom-scroll mt-6 pr-6`}>
                <ul className={`${styles.ingredientsList}`}>

                  {
                    Object.keys(getOrderIngredients().ids).map((key, index) => {
                      const item = getOrderIngredients().ids[key];
                      return (
                        <li key={index}>
                          <div className={`${styles.ingredient}`}>
                            <div className={`${styles.ingredientImageContainer}`}>
                              <img className={`${styles.ingredientImage}`} src={item.image} alt={item.name} />
                            </div>
                            <p className={`${styles.ingredientName} text text_type_main-default`}>{item.name}</p>
                            <p className={`${styles.ingredientPrice} text text_type_digits-default`}>
                              <span>{item.count} x {item.price}</span><CurrencyIcon type="primary" />
                            </p>
                          </div>
                        </li>
                      );
                    })
                  }

                </ul>
              </section>
              <div className={`${styles.orderInfoFooter} pt-10`}>
                <p className="text text_type_main-default text_color_inactive">
                  <FormattedDate date={new Date(orderInfo[0].createdAt)} />
                </p>
                <p className={`${styles.orderTotal} text text_type_digits-default`}>
                  {getOrderIngredients().total}<CurrencyIcon type="primary" />
                </p>
              </div>
            </section>
          )
      }


    </main>
  );
}

export default OrderInfo;
