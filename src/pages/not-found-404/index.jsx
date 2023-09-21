import { useNavigate } from 'react-router-dom';
import styles from './not-found-404.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function NotFound404() {

  const navigate = useNavigate();

  return (
    <main className={styles.main}>
      <p className={styles.image}>👨🏻‍🍳</p>
      <h1 className="text text_type_main-medium">Упс, cтраница не найдена...</h1>
      <Button
          extraClass="mt-8"
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => navigate('/')}
      >🠔 Вернуться в конструктор</Button>
    </main>
  );
}

export default NotFound404;
