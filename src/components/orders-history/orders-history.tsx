import React from 'react';
import { useAppDispatch, useAppSelector } from '../../services/types';
import styles from './orders-history.module.css';
import { connectPrivate, disconnect } from '../../services/actions/socket';
import OrderBadge from '../order-badge/order-badge';
import { loadData } from '../../services/actions';

function OrdersHistory() {

  const dispatch = useAppDispatch();

  const { orders } = useAppSelector((store) => store.socket);
  const { data: ingredients } = useAppSelector((store) => store.data);

  React.useEffect(() => {
    dispatch(connectPrivate());
    return () => {
      dispatch(disconnect());
    }
  },[dispatch]);

  React.useEffect(() => {
    ingredients.length === 0 && dispatch(loadData());
  },[dispatch, ingredients]);

  return (
    <section className={`${styles.ordersArea} custom-scroll`}>
      <ul className={`${styles.ordersList}`}>

      {
        orders
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((order) => (
          <OrderBadge key={order._id} orderData={order} />
        ))
      }

      </ul>
    </section>
  );
}

export default OrdersHistory;
