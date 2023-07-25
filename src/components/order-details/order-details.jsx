import orderDetailsStyles from './order-details.module.css';
import imgDone from '../../images/done.svg';

function OrderDetails() {
  return (
    <section className={`${orderDetailsStyles.section} pt-4 pb-15`} aria-label='Информация о заказе'>
      <p className={`${orderDetailsStyles.id} text text_type_digits-large`}>034536</p>
      <p className={`${orderDetailsStyles.description} text text_type_main-medium pt-8`}>идентификатор заказа</p>
      <img className={`${orderDetailsStyles.image} pt-15 pb-15`} src={imgDone} alt="Готово" />
      <p className={`${orderDetailsStyles.status} text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`${orderDetailsStyles.waitingArea} text text_type_main-default text_color_inactive pt-2`}>Дождитесь готовности на орбитальной станции</p>
    </section>
  );
}

export default OrderDetails;
