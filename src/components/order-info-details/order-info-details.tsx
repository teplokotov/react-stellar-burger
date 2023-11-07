import React from 'react';
import { useAppDispatch, useAppSelector } from '../../services/types';
import styles from './order-info-details.module.css';
import { useParams } from 'react-router-dom';
import { getOrderInfo } from '../../services/actions/exchangingOrderDetails';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getProp } from '../../utils/utils';
import { loadData } from '../../services/actions';
import { orderStatuses } from '../../utils/constants';
import { TIngredient } from '../../services/types';

interface OrderInfoDetailsProps {
  isModal?: boolean;
}

function OrderInfoDetails({ isModal }: OrderInfoDetailsProps) {

  const dispatch = useAppDispatch();

  const { id: orderId } = useParams();
  const { data: ingredients, isLoading, hasError } = useAppSelector((store) => store.data);
  const { orderInfo, isLoading: isLoadingOrder } = useAppSelector((store) => store.order);

  const id = orderId;

  function getOrderIngredients(ingredients: TIngredient[]) {
    const uniqueIds = Array.from(new Set(orderInfo[0].ingredients));

    const result: {
      ids: {
        [key: string] : {
        'image': string;
        'name': string;
        'count': number;
        'price': string;
      }};
      total: number;
    } = { ids: {}, total: 0 };

    if(ingredients) {
      uniqueIds.forEach((id) => {
        result['ids'][id] = {
          'image': String(getProp(ingredients, id, 'image')),
          'name': String(getProp(ingredients, id, 'name')),
          'count': Number(orderInfo[0].ingredients.reduce((acc, item) => acc += item === id ? 1 : 0, 0)),
          'price': String(getProp(ingredients, id, 'price')),
        };
      });
      result['total'] = orderInfo[0].ingredients.reduce((acc, item) => acc += Number(getProp(ingredients, item, 'price')), 0);
    }
    return result;
  };

  React.useEffect(() => {
    !orderInfo[0] && !isLoadingOrder && dispatch(getOrderInfo(Number(id)));
    !orderInfo[0] && dispatch(loadData());
  },[dispatch, id, isLoadingOrder, orderInfo]);

  return orderInfo[0] && (
    <section className={`${styles.orderInfoSection}`}>
      {!isModal && <p className={`${styles.orderNumber} text text_type_digits-default pb-5`}>#{orderInfo[0].number}</p>}
      <h1 className="text text_type_main-medium pt-5">{orderInfo[0].name}</h1>
      <p className="text text_type_main-default pt-3"
          style={{color: orderStatuses[orderInfo[0].status as keyof typeof orderStatuses]['color']}}
      >{orderStatuses[orderInfo[0].status as keyof typeof orderStatuses]['text']}</p>
      <h2 className="text text_type_main-medium pt-15">Состав:</h2>
      <section className={`${styles.ingredientsArea} custom-scroll mt-6 pr-6`}>
        <ul className={`${styles.ingredientsList}`}>

          {
            !isLoading && !hasError && ingredients.length > 0 &&
            Object.keys(getOrderIngredients(ingredients).ids).map((key, index) => {
              const item = getOrderIngredients(ingredients).ids[key];
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
          {getOrderIngredients(ingredients).total}<CurrencyIcon type="primary" />
        </p>
      </div>
    </section>
  );
}

export default OrderInfoDetails;
