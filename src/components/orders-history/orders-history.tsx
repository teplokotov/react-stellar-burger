import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './orders-history.module.css';
import { connectPrivate, disconnect } from '../../services/actions/socket';
import OrderBadge from '../order-badge/order-badge';
import { loadData } from '../../services/actions';
import { RootState } from '../../services/types';

function OrdersHistory() {

  const dispatch = useDispatch();

  const { orders } = useSelector((store: RootState) => store.socket);
  const { data: ingredients } = useSelector((store: RootState) => store.data);

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
