import { useDispatch } from "react-redux";
import { logoutUser } from "../../services/actions/userInfo";
import { Link, NavLink, Outlet } from 'react-router-dom';
import styles from './profile.module.css';

function Profile() {

  const dispatch = useDispatch();

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
            <Link onClick={logOut} className={inactiveLinkStyle}>Выход</Link>
          </li>
        </ul>
        <p className={`${styles.caption} text text_type_main-default text_color_inactive pt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
      </nav>
      <Outlet />
    </main>

  );
}

export default Profile;
