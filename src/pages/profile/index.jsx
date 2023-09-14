import React from "react";
import { Link, NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

function Profile() {

  const [isNameDisabled, setIsNameDisabled] = React.useState(true);

  const [firstname, setFirstname] = React.useState('Марк');
  const [email, setEmail] = React.useState('mail@stellar.burgers');
  const [password, setPassword] = React.useState('123456');

  const nameRef = React.useRef(null);

  function logOut() {
    console.log('Нажали выход');
  }

  function onNameIconClick() {
    setIsNameDisabled(false);
    setTimeout(() => nameRef.current.focus(), 0)
  }

  const activeLinkStyle = `${styles.navlink} text text_type_main-medium ${styles.navlink_active}`;
  const inactiveLinkStyle = `${styles.navlink} text text_type_main-medium text_color_inactive`;

  return (
    <main className={`${styles.main} pt-10`}>
      <nav className={`${styles.nav} pt-20`}>
        <ul className={styles.list}>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle}
            >Профиль</NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/orders"
              className={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle}
            >История заказов</NavLink>
          </li>
          <li>
            <Link onClick={logOut} className={inactiveLinkStyle}>Выход</Link>
          </li>
        </ul>
      </nav>
      <form className={`${styles.form} pt-20`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setFirstname(e.target.value)}
          icon={"EditIcon"}
          value={firstname}
          name={'name'}
          ref={nameRef}
          onIconClick={onNameIconClick}
          onBlur={() => setIsNameDisabled(true)}
          disabled={isNameDisabled}
        />
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={'email'}
          isIcon={true}
          errorText={'Исправьте ошибку в написании e-mail'}
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={'password'}
          icon="EditIcon"
          errorText={'Минимальная длина пароля — 6 символов'}
        />
      </form>
    </main>

  );
}

export default Profile;
