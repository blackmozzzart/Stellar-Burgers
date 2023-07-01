import React, { useState, useRef } from 'react';
import styles from './reset-password.module.css';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPasswordRequest } from '../../utils/api';

export const ResetPassword = () => {
    const [codeValue, setCodeValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!passValue || !codeValue) {
            return;
        }
        resetPasswordRequest(passValue, codeValue)
    };

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1
                    className={`${styles.title} text text_type_main-medium mb-6`}
                >
                    Восстановление пароля
                </h1>
                <PasswordInput
                    onChange={(e) => { setPassValue(e.target.value) }}
                    value={passValue}
                    name={'password'}
                    //@ts-ignore
                    placeholder={'Введите новый пароль'}
                />
                <div className='mb-6 mt-6'>
                    <Input
                        value={codeValue}
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={(e) => setCodeValue(e.target.value)}
                        name={'e-mail'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <Button type='primary' size='medium' htmlType='submit'>
                    Сохранить
                </Button>
            </form>
            <p className='text text_type_main-default text_color_inactive'>
                {'Вспомнили пароль? '}
                <Link className={styles.link} to='/login'>
                    Войти
                </Link>
            </p>
        </div>
    );
};
