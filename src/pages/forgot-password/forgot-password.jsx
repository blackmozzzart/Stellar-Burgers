import React, { useRef, useState } from 'react';
import styles from './forgot-password.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPasswordRequest } from '../../utils/api';

export const ForgotPassword = () => {
    const [emailValue, setEmailValue] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!emailValue) {
            return;
        }
        forgotPasswordRequest(emailValue)
            .then(() => {
                navigate('/reset-password')
            });
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={`${styles.title} text text_type_main-medium mb-6`}>
                    Восстановление пароля
                </h1>
                <div className='mb-6'>
                    <Input
                        value={emailValue}
                        type={'text'}
                        placeholder={'Укажите e-mail'}
                        onChange={(e) => setEmailValue(e.target.value)}
                        name={'e-mail'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <Button type='primary' size='medium' htmlType='submit'>
                    Восстановить
                </Button>
            </form>
            <p className='text text_type_main-default text_color_inactive'>
                {'Вспомнили пароль? '}
                <Link className={styles.link} to='/login'>
                    Войти
                </Link>
            </p>
        </div>
    )
}
