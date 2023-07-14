import appHeaderStyles from './app-header.module.css';
import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={`${appHeaderStyles.header} pt-16`}>
      <nav className={`${appHeaderStyles.nav} pt-4 pb-4`}>
        <ul className={appHeaderStyles.leftside}>
          <li>
            <Button htmlType="button"
                    type="secondary"
                    size="medium"
                    style={{color:'#F2F2F3'}}
                    extraClass={`${appHeaderStyles.button} pr-5 pl-5`}>
              <BurgerIcon type="primary" />Конструктор
            </Button>
          </li>
          <li>
            <Button htmlType="button"
                    type="secondary"
                    size="medium"
                    style={{color:'#8585AD'}}
                    extraClass={`${appHeaderStyles.button} pr-5 pl-5`}>
              <ListIcon type="secondary" />Лента заказов
            </Button>
          </li>
        </ul>
        <div className={appHeaderStyles.logo}>
          <Logo />
        </div>
        <Button htmlType="button"
                type="secondary"
                size="medium"
                style={{color:'#8585AD'}}
                extraClass={`${appHeaderStyles.rightside} ${appHeaderStyles.button} pr-5 pl-5`}>
          <ProfileIcon type="secondary" />Личный кабинет
        </Button>
      </nav>
    </header>
  );
}

export default AppHeader;
