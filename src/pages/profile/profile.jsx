import React, { useState } from 'react';
import styles from './profile.module.css';
import { NavLink, useResolvedPath } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

export const Profile = () => {
    const url = useResolvedPath('').pathname;
    const [nameValue, setNameValue] = useState('');
    const [loginValue, setLoginValue] = useState('');
    const [passValue, setPassValue] = useState('');

    return (
        <div className={styles.wrapper}>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    <li className={styles.list_item}>
                        <NavLink
                            className={`${styles.link} text text_type_main-medium`}
                            to={`${url}`}>
                            Профиль
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={`${styles.link} text text_type_main-medium`}
                            to={`${url}/orders`}>
                            История заказов
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={`${styles.link} text text_type_main-medium`}
                            to='/login'>
                            Выход
                        </NavLink>
                    </li>
                </ul>
                <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <form className={styles.form}>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    icon={"EditIcon"}
                    value={nameValue}
                    name={"name"}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                />
                <Input
                    type={"text"}
                    placeholder={"Логин"}
                    icon={"EditIcon"}
                    value={loginValue}
                    name={"name"}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                />
                <Input
                    type={"text"}
                    placeholder={"Пароль"}
                    icon={"EditIcon"}
                    value={passValue}
                    name={"name"}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                />
                {
                    <div className={styles.buttons_container}>
                        <Button type="secondary" size="medium" htmlType='reset'>
                            Отмена
                        </Button>
                        <Button type="primary" size="medium" htmlType='submit'>
                            Сохранить
                        </Button>
                    </div>
                }
            </form>
        </div>
    )
}
