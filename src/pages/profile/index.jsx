import React from "react";
import { Link, NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../services/actions/userInfo";
import { getUserInfo, sendUserInfo } from "../../services/actions/userInfo";

function Profile() {

  const dispatch = useDispatch();

  const userInfo = useSelector((store) => store.userInfo);

  const [isNameDisabled, setIsNameDisabled] = React.useState(true);
  const [isEmailDisabled, setIsEmailDisabled] = React.useState(true);
  const [isPasswordDisabled, setIsPasswordDisabled] = React.useState(true);
  const [firstname, setFirstname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('******');
  const [isShowButtons, setIsShowButtons] = React.useState(false);

  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  React.useEffect(() => {
    dispatch(getUserInfo())
      .then(data => {
        if(data && data.success) {
          setFirstname(data.user.name);
          setEmail(data.user.email);
        };
      })
  },[dispatch]);

  function onSubmit(e) {
    e.preventDefault();
    password !== '******' ?
      dispatch(sendUserInfo(email, firstname, password)) :
      dispatch(sendUserInfo(email, firstname));
  }

  function onClickResetBtn() {
    setFirstname(userInfo.firstname);
    setEmail(userInfo.email);
    setPassword('******');
  }

  function logOut() {
    dispatch(logoutUser());
  }

  function onNameIconClick() {
    setIsNameDisabled(false);
    setTimeout(() => nameRef.current.focus(), 0)
  }

  function onEmailIconClick() {
    setIsEmailDisabled(false);
    setTimeout(() => emailRef.current.focus(), 0)
  }

  function onPasswordIconClick() {
    setIsPasswordDisabled(false);
    setTimeout(() => passwordRef.current.focus(), 0)
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
        <p className={`${styles.caption} text text_type_main-default text_color_inactive pt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
      </nav>
      <form className={`${styles.form} pt-20`}
        onSubmit={onSubmit}
        onChange={() => setIsShowButtons(true)}
      >
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
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          icon={"EditIcon"}
          placeholder="Логин"
          name={'email'}
          ref={emailRef}
          onIconClick={onEmailIconClick}
          onBlur={() => setIsEmailDisabled(true)}
          errorText={'Исправьте ошибку в написании e-mail'}
          disabled={isEmailDisabled}
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={'password'}
          icon="EditIcon"
          placeholder="Пароль"
          ref={passwordRef}
          onIconClick={onPasswordIconClick}
          onBlur={() => setIsPasswordDisabled(true)}
          errorText={'Минимальная длина пароля — 6 символов'}
          disabled={isPasswordDisabled}
        />
        {isShowButtons &&
          <span className={styles.buttonsSection}>
            <Button
              onClick={onClickResetBtn}
              extraClass={styles.button}
              htmlType="button"
              type="secondary"
              size="medium"
            >Отмена</Button>
            {firstname && email && password &&
              <Button
                extraClass={styles.button}
                htmlType="submit"
                type="primary"
                size="medium"
              >Сохранить</Button>
            }
          </span>
        }
      </form>
    </main>

  );
}

export default Profile;
