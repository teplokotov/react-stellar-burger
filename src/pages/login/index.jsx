import React from "react";
import styles from './login.module.css';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

function Login() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <main className={styles.main}>
      <form>
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
      </form>
    </main>

  );
}

export default Login;
