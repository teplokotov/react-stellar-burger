import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from "../../services/actions/userInfo";

function Login() {

  const { email: emailAfterReset } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function onSubmit(e) {
    e.preventDefault();
    email && password && dispatch(loginUser(email, password));
  }

  React.useEffect(() => {
    if (emailAfterReset) {
      setEmail(emailAfterReset);
      const passwordInput = document.querySelector('input[name="password"]');
      setTimeout(() => passwordInput.focus(), 0);
    }
  },[emailAfterReset]);

  return (
    <main className={styles.main}>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>
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
        >Войти</Button>
      </form>
      <p className="text text_type_main-default">
        Вы — новый пользователь?
        <Link className={`${styles.link} pl-2`} to='/register'>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default pt-4">
        Забыли пароль?
        <Link className={`${styles.link} pl-2`} to='/forgot-password'>Восстановить пароль</Link>
      </p>
    </main>

  );
}

export default Login;
