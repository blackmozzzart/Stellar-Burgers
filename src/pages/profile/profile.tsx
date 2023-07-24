import React from 'react';
import styles from './profile.module.css';
import { NavLink, useResolvedPath } from 'react-router-dom';
import { ProfileForm } from '../../components/ProfileForm';
import { logoutThunk } from '../../services/actions/user';
import { ROUTE_LOGIN } from '../../utils/constants';
import { useAppDispatch } from '../../services/store';

export const Profile: React.FC = () => {
    const url = useResolvedPath('').pathname;
    const dispatch = useAppDispatch();

    return (
        <div className={styles.wrapper}>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    <li className={styles.list_item}>
                        <NavLink
                            className={({ isActive }) => `${isActive ? styles.link_active : ''} ${styles.link} text text_type_main-medium`}
                            to={`${url}`}
                        >
                            Профиль
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => `${isActive ? styles.link_active : ''} ${styles.link} text text_type_main-medium`}
                            to={`${url}/orders`}>
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
            <div>
                <ProfileForm />
            </div>
        </div>
    )
}
