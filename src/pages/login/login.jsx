import React, { useState, useRef } from 'react';
import styles from './login.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../services/actions/authentication';

export const Login = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!emailValue || !passValue) {
            return;
        }
        dispatch(loginThunk(emailValue, passValue))
            .then(() => {
                navigate('/')
            });
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={`${styles.title} text text_type_main-medium`}>
                    Вход
                </h1>
                <div className='mt-6 mb-6'>
                    <Input
                        value={emailValue}
                        type={'text'}
                        placeholder={'E-mail'}
                        onChange={(e) => setEmailValue(e.target.value)}
                        name={'e-mail'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
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
                <Link className={styles.link} to='/register'>
                    Зарегистрироваться
                </Link>
            </p>
            <p className='text text_type_main-default text_color_inactive mt-4'>
                {'Забыли пароль? '}
                <Link className={styles.link} to='/forgot-password'>
                    Восстановить пароль
                </Link>
            </p>
        </div>
    )
}
