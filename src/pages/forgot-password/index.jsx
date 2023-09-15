import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function ForgotPassword() {

  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    email && navigate('/reset-password', {
      replace: true,
      state: { hasAccess: true }
    });
  }

  return (
    <main className={styles.main}>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Укажите e-mail"
          value={email}
          name={'email'}
          isIcon={false}
          errorText={'Исправьте ошибку в написании e-mail'}
        />
        <Button
          extraClass={styles.Button}
          htmlType="submit"
          type="primary"
          size="medium"
        >Войти</Button>
      </form>
      <p className="text text_type_main-default">
        Вспомнили пароль?
        <Link className={`${styles.link} pl-2`} to='/login'>Войти</Link>
      </p>
    </main>

  );
}

export default ForgotPassword;
