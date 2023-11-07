import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "react-redux";
import { saveNewPassword } from "../../services/actions/userInfo";

function ResetPassword() {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = React.useState<string>('');
  const [code, setCode] = React.useState<string>('');

  const checkHasAccess = React.useCallback(() => {
    return location.state && location.state.hasAccess !== null ? location.state.hasAccess : false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    code && password && dispatch(saveNewPassword(password, code)) && navigate('/login');
  }

  return (
    <main className={styles.main}>

      {/* Disable direct route */}
      {
        checkHasAccess() === false ? (
          <p className="text text_type_main-medium">
            {'🌅 Скоро рассвет... прямого доступа нет'}
          </p>
        ) : (
          <>
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
          </>
        )
      }
    </main>

  );
}

export default ResetPassword;
