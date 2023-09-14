import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import appHeaderStyles from './app-header.module.css';
import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {

  const navigate = useNavigate();
  const location = useLocation();

  const getStyleOfIcon = React.useCallback((url) => {
    return location.pathname === url ? 'primary' : 'secondary';
  }, [location]);

  const getStyleOfText = React.useCallback((url) => {
    return location.pathname === url ? 'text_color_primary' : 'text_color_inactive';
  }, [location]);

  return (
    <header className={`${appHeaderStyles.header} pt-16`}>
      <nav className={`${appHeaderStyles.nav} pt-4 pb-4`}>
        <ul className={appHeaderStyles.leftside}>
          <li>
            <Button htmlType="button"
                    onClick={() => navigate('/')}
                    type="secondary"
                    size="medium"
                    extraClass={`${appHeaderStyles.button} ${getStyleOfText('/')} pr-5 pl-5`}>
              <BurgerIcon type={getStyleOfIcon('/')} />Конструктор
            </Button>
          </li>
          <li>
            <Button htmlType="button"
                    onClick={() => navigate('/profile/orders/')}
                    type="secondary"
                    size="medium"
                    extraClass={`${appHeaderStyles.button} ${getStyleOfText('/profile/orders/')} pr-5 pl-5`}>
              <ListIcon type={getStyleOfIcon('/profile/orders/')} />Лента заказов
            </Button>
          </li>
        </ul>
        <div className={appHeaderStyles.logo}>
          <Logo />
        </div>
        <Button htmlType="button"
                onClick={() => navigate('/profile/')}
                type="secondary"
                size="medium"
                extraClass={`${appHeaderStyles.rightside} ${appHeaderStyles.button} ${getStyleOfText('/profile/')} pr-5 pl-5`}>
          <ProfileIcon type={getStyleOfIcon('/profile/')} />Личный кабинет
        </Button>
      </nav>
    </header>
  );
}

export default AppHeader;
