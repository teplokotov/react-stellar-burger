import React from 'react';
import { useAppDispatch, useAppSelector } from '../../services/types';
import styles from './feed.module.css';
import { connect, disconnect } from '../../services/actions/socket';
import OrderBadge from '../../components/order-badge/order-badge';

function Feed() {

  const dispatch = useAppDispatch();

  const { orders, total, totalToday } = useAppSelector((store) => store.socket);

  React.useEffect(() => {
    dispatch(connect());
    return () => {
      dispatch(disconnect());
    }
  },[dispatch]);

  const ordersReady = React.useCallback(() => {
    const filtered = orders.filter((order) => order.status === 'done');
    return filtered.splice(30, 20);
  }, [orders]);

  const ordersCooking = React.useCallback(() => {
    const filtered = orders.filter((order) => order.status === 'pending');
    return filtered.splice(30, 20);
  }, [orders]);

  return (
    <main className={styles.main}>
      <section className={`${styles.leftSection} pt-10`}>
        <h1 className="text text_type_main-large">Лента заказов</h1>

        {/* Orders area */}
        <section className={`${styles.ordersArea} custom-scroll mt-5`}>
          <ul className={`${styles.ordersList}`}>

          {
            orders.map((order) => (
              <OrderBadge key={order._id} orderData={order} />
            ))
          }

          </ul>
        </section>

      </section>
      <section className={`${styles.rightSection} pt-25`}>

        <div className={`${styles.statuses}`}>
          <div className={`${styles.ordersNums}`}>
            <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
            <ul className={`${styles.list} ${styles.list_colored}`}>
              {
                ordersReady().map((order, index) => {
                  return (
                    <li key={index}>
                      <p className="text text_type_digits-default">{order.number}</p>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className={`${styles.ordersNums}`}>
            <h2 className="text text_type_main-medium pb-6">В работе:</h2>
            <ul className={`${styles.list}`}>
              {
                ordersCooking().map((order, index) => {
                  return (
                    <li key={index}>
                      <p className="text text_type_digits-default">{order.number}</p>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
          <p className="text text_type_digits-large">{total}</p>
        </div>

        <div>
          <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </section>
    </main>
  );
}

export default Feed;
