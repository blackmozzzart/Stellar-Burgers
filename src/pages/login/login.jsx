import React, { useState } from 'react';
import styles from './login.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_FAILURE, loginThunk } from '../../services/actions/user';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../services/store';
import { ROUTE_FORGOT_PASSWORD, ROUTE_REGISTER } from '../../utils/constants';

export const Login = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isError = useAppSelector((store) => store.user.loginRequestFailed)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!emailValue || !passValue) {
            return;
        }
        dispatch(loginThunk(emailValue, passValue))
            .then(() => {
                navigate('/')
            })
            .catch(() => {
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: false
                })
            })
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={`${styles.title} text text_type_main-medium`}>
                    Вход
                </h1>
                {isError && <h3>Неправильный логин или пароль!</h3>}
                <div className='mt-6 mb-6'>
                    <EmailInput
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        name={'e-mail'}
                    />
                </div>
                <div className='mb-6'>
                    <PasswordInput
                        value={passValue}
                        onChange={(e) => setPassValue(e.target.value)}
                        name={'password'}
                    />
                </div>
                <Button type='primary' size='medium' htmlType='submit'>
                    Войти
                </Button>
            </form>
            <p className='text text_type_main-default text_color_inactive'>
                {'Вы - новый пользователь? '}
                <Link className={styles.link} to={ROUTE_REGISTER}>
                    Зарегистрироваться
                </Link>
            </p>
            <p className='text text_type_main-default text_color_inactive mt-4'>
                {'Забыли пароль? '}
                <Link className={styles.link} to={ROUTE_FORGOT_PASSWORD}>
                    Восстановить пароль
                </Link>
            </p>
        </div>
    )
}
