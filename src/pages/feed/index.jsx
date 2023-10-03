import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './feed.module.css';
import { connect, disconnect } from '../../services/actions/socket';
import OrderBadge from '../../components/order-badge/order-badge';
import { loadData } from '../../services/actions';

function Feed() {

  const dispatch = useDispatch();

  const { orders, total, totalToday } = useSelector((store) => store.socket);
  const { data: ingredients } = useSelector((store) => store.data);

  React.useEffect(() => {
    dispatch(connect());
    return () => {
      dispatch(disconnect());
    }
  },[dispatch]);

  React.useEffect(() => {
    ingredients.length === 0 && dispatch(loadData());
  },[dispatch, ingredients]);

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
              <li>
                <p className="text text_type_digits-default">034533</p>
              </li>
              <li>
                <p className="text text_type_digits-default">034532</p>
              </li>
              <li>
                <p className="text text_type_digits-default">034530</p>
              </li>
              <li>
                <p className="text text_type_digits-default">034527</p>
              </li>
              <li>
                <p className="text text_type_digits-default">034525</p>
              </li>
            </ul>
          </div>
          <div className={`${styles.ordersNums}`}>
            <h2 className="text text_type_main-medium pb-6">В работе:</h2>
            <ul className={`${styles.list}`}>
              <li>
                <p className="text text_type_digits-default">034538</p>
              </li>
              <li>
                <p className="text text_type_digits-default">034541</p>
              </li>
              <li>
                <p className="text text_type_digits-default">034542</p>
              </li>
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
