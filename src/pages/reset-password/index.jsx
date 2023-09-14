import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function ResetPassword() {

  const [password, setPassword] = React.useState('');
  const [code, setCode] = React.useState('');
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    code && password && navigate('/login', {replace: true});
  }

  return (
    <main className={styles.main}>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите новый пароль"
          value={password}
          name={'password'}
          errorText={'Минимальная длина пароля — 6 символов'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={(e) => setCode(e.target.value)}
          value={code}
          name={'code'}
        />
        <Button
          extraClass={styles.Button}
          htmlType="submit"
          type="primary"
          size="medium"
        >Сохранить</Button>
      </form>
      <p className="text text_type_main-default">
        Вспомнили пароль?
        <Link className={`${styles.link} pl-2`} to='/login'>Войти</Link>
      </p>
    </main>

  );
}

export default ResetPassword;
