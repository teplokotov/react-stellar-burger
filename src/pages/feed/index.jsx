import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './feed.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL } from '../../services/actions/modal';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect, disconnect } from '../../services/actions/socket';

function Feed() {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { total, totalToday } = useSelector((store) => store.socket);

  React.useEffect(() => {
    dispatch(connect());
    return () => {
      setTimeout(() => dispatch(disconnect()), 1000);
    }
  },[dispatch]);

  function handleOnClick() {
    dispatch({
      type: OPEN_MODAL,
      typeOfModal: 'orderInfo',
    });

    navigate('/feed/' + 21890, {state: { background: location }});
  }

  return (
    <main className={styles.main}>
      <section className={`${styles.leftSection} pt-10`}>
        <h1 className="text text_type_main-large">Лента заказов</h1>

        {/* Orders area */}
        <section className={`${styles.ordersArea} custom-scroll mt-5`}>
          <ul className={`${styles.ordersList}`}>
            <li className={`${styles.orderDetails}`} onClick={handleOnClick}>
              <div className={`${styles.orderDetailsHeader}`}>
                <p className="text text_type_digits-default">#034535</p>
                <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
              </div>
              <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
              <div className={`${styles.orderDetailsFooter}`}>
                <ul className={`${styles.orderIngredients}`}>
                  <li className={`${styles.orderIngredient}`} style={{zIndex: 6}}>
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
                  </li>
                </ul>
                <p className={`${styles.orderDetailsPrice} text text_type_digits-default`}>480<CurrencyIcon type="primary" /></p>
              </div>
            </li>
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
