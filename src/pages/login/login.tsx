import React, { useState, FormEvent } from 'react';
import styles from './login.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { loginThunk } from '../../services/redux/actions/user';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { ROUTE_FORGOT_PASSWORD, ROUTE_REGISTER } from '../../utils/constants';

export const Login: React.FC = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const dispatch = useAppDispatch();
    const isError = useAppSelector((store) => store.user.loginRequestFailed)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!emailValue || !passValue) {
            return;
        }

        dispatch(loginThunk({
            email: emailValue,
            password: passValue
        }))

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
