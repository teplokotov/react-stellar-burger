import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import styles from './register.module.css';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "react-redux";
import { registerUser } from "../../services/actions/registerUser";

function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstname, setFirstname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function onSubmit(e) {
    e.preventDefault();
    firstname && email && password && dispatch(registerUser(email, password, firstname))
      .then(data => {
        if(data && data.success) {
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("accessToken", data.accessToken);
          navigate('/');
        };
      })
  }

  return (
    <main className={styles.main}>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
          name={'name'}
        />
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={'email'}
          isIcon={false}
          errorText={'Исправьте ошибку в написании e-mail'}
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={'password'}
          errorText={'Минимальная длина пароля — 6 символов'}
        />
        <Button
          extraClass={styles.Button}
          htmlType="submit"
          type="primary"
          size="medium"
        >Зарегистрироваться</Button>
      </form>
      <p className="text text_type_main-default">
        Уже зарегистрированы?
        <Link className={`${styles.link} pl-2`} to='/login'>Войти</Link>
      </p>
    </main>

  );
}

export default Register;
