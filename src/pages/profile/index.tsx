import { useAppDispatch } from "../../services/types";
import { logoutUser } from "../../services/actions/userInfo";
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './profile.module.css';

function Profile() {

  const dispatch = useAppDispatch();
  const location = useLocation();

  function logOut() {
    dispatch(logoutUser());
  }

  const activeLinkStyle = `${styles.navlink} text text_type_main-medium ${styles.navlink_active}`;
  const inactiveLinkStyle = `${styles.navlink} text text_type_main-medium text_color_inactive`;

  return (
    <main className={`${styles.main} pt-10`}>
      <nav className={`${styles.nav} pt-20`}>
        <ul className={styles.list}>
          <li>
            <NavLink
              end
              to="/profile/"
              className={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle}
            >Профиль</NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/orders/"
              className={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle}
            >История заказов</NavLink>
          </li>
          <li>
            <Link to='/' onClick={logOut} className={inactiveLinkStyle}>Выход</Link>
          </li>
        </ul>
        <p className={`${styles.caption} text text_type_main-default text_color_inactive pt-20`}>
          {location.pathname === '/profile/' && 'В этом разделе вы можете изменить свои персональные данные'}
          {location.pathname === '/profile/orders/' && 'В этом разделе вы можете просмотреть свою историю заказов'}
        </p>
      </nav>
      <Outlet />
    </main>

  );
}

export default Profile;
