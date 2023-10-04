import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './orders-history.module.css';
import { connectPrivate, disconnect } from '../../services/actions/socket';
import OrderBadge from '../../components/order-badge/order-badge';
import { loadData } from '../../services/actions';

function OrdersHistory() {

  const dispatch = useDispatch();

  const { orders } = useSelector((store) => store.socket);
  const { data: ingredients } = useSelector((store) => store.data);

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
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((order) => (
          <OrderBadge key={order._id} orderData={order} />
        ))
      }

      </ul>
    </section>
  );
}

export default OrdersHistory;
