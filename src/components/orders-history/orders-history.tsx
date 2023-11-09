import React from 'react';
import { useAppDispatch, useAppSelector } from '../../services/types';
import styles from './orders-history.module.css';
import { connectPrivate, disconnect } from '../../services/actions/socket';
import OrderBadge from '../order-badge/order-badge';

function OrdersHistory() {

  const dispatch = useAppDispatch();

  const { orders } = useAppSelector((store) => store.socket);

  React.useEffect(() => {
    dispatch(connectPrivate());
    return () => {
      dispatch(disconnect());
    }
  },[dispatch]);

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
