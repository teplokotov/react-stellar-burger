import React from 'react';
import { useAppDispatch, useAppSelector } from '../../services/types';
import styles from './orderInfo.module.css';
import { useParams } from 'react-router-dom';
import OrderInfoDetails from '../../components/order-info-details/order-info-details';
import { SET_CURRENT_ORDER_ID, getOrderInfo } from '../../services/actions/exchangingOrderDetails';
import { loadData } from '../../services/actions';

function OrderInfo() {

  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { data: ingredients } = useAppSelector((store) => store.data);
  const { orderInfo, isLoading, hasError } = useAppSelector((store) => store.order);

  React.useEffect(() => {
    dispatch(getOrderInfo(Number(id)));
    dispatch(loadData());
    dispatch({
      type: SET_CURRENT_ORDER_ID,
      currentOrderID: Number(id),
    });
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
          <OrderInfoDetails />
      }

    </main>
  );
}

export default OrderInfo;
