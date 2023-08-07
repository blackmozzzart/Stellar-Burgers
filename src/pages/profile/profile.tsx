import React from 'react';
import styles from './profile.module.css';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { logoutThunk } from '../../services/redux/actions/user';
import { ROUTE_LOGIN, ROUTE_ORDERS, ROUTE_PROFILE } from '../../utils/constants';
import { useAppDispatch } from '../../services/store';

export const Profile: React.FC = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    return (
        <div className='container'>
            <div className={styles.wrapper}>
                <nav className={styles.navigation}>
                    <ul className={styles.list}>
                        <li className={styles.list_item}>
                            <NavLink
                                className={({ isActive }) => `${isActive && pathname === '/profile' ? styles.link_active : ''} ${styles.link} text text_type_main-medium`}
                                to={ROUTE_PROFILE}
                            >
                                Профиль
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => `${isActive ? styles.link_active : ''} ${styles.link} text text_type_main-medium`}
                                to={ROUTE_ORDERS}
                            >
                                История заказов
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => `${isActive ? styles.link_active : ''} ${styles.link} text text_type_main-medium`}
                                to={ROUTE_LOGIN}
                                onClick={() => {
                                    dispatch(logoutThunk())
                                }}>
                                Выход
                            </NavLink>
                        </li>
                    </ul>
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </nav>
                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
