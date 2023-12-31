import React from "react";
import styles from './user-form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from "../../services/types";
import { sendUserInfo } from "../../services/actions/userInfo";

function UserForm() {

  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((store) => store.userInfo);

  const [isNameDisabled, setIsNameDisabled] = React.useState<boolean>(true);
  const [isEmailDisabled, setIsEmailDisabled] = React.useState<boolean>(true);
  const [isPasswordDisabled, setIsPasswordDisabled] = React.useState<boolean>(true);
  const [firstname, setFirstname] = React.useState<string>(userInfo.firstname);
  const [email, setEmail] = React.useState<string>(userInfo.email);
  const [password, setPassword] = React.useState<string>('******');
  const [isShowButtons, setIsShowButtons] = React.useState<boolean>(false);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    password !== '******' ?
      dispatch(sendUserInfo(email, firstname, password)) :
      dispatch(sendUserInfo(email, firstname));
      setIsShowButtons(false);
      setPassword('******');
  }

  function onClickResetBtn() {
    setFirstname(userInfo.firstname);
    setEmail(userInfo.email);
    setPassword('******');
  }

  function onNameIconClick() {
    setIsNameDisabled(false);
    setTimeout(() => { if(nameRef.current) nameRef.current.focus() }, 0);
  }

  function onEmailIconClick() {
    setIsEmailDisabled(false);
    setTimeout(() => { if(emailRef.current) emailRef.current.focus() }, 0)
  }

  function onPasswordIconClick() {
    setIsPasswordDisabled(false);
    setTimeout(() => { if(passwordRef.current) passwordRef.current.focus() } , 0)
  }

  return (
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
  )
}

export default UserForm;
