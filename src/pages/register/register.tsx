import React, { useState, useRef, FormEvent } from 'react';
import styles from './register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { registerThunk } from '../../services/actions/user';
import { ROUTE_LOGIN } from '../../utils/constants';
import { useAppDispatch } from '../../services/store';

export const Register: React.FC = () => {
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nameValue || !emailValue || !passValue) {
            return;
        }
        dispatch(registerThunk(emailValue, nameValue, passValue))
    }

    const passChange = (e: FormEvent<HTMLInputElement>) => {
        setPassValue(e.currentTarget.value);
    }


    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={`${styles.title} text text_type_main-medium`}>
                    Регистрация
                </h1>
                <div className='mt-6 mb-6'>
                    <Input
                        value={nameValue}
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={(e) => setNameValue(e.target.value)}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className='mb-6'>
                    <Input
                        value={emailValue}
                        type={'text'}
                        placeholder={'E-mail'}
                        onChange={(e) => setEmailValue(e.target.value)}
                        name={'email'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className='mb-6'>
                    <PasswordInput
                        onChange={passChange}
                        value={passValue}
                        name={'password'}
                    />
                </div>
                <Button type='primary' size='medium' htmlType='submit'>
                    Зарегистрироваться
                </Button>
            </form>
            <p className='text text_type_main-default text_color_inactive'>
                {'Уже зарегистрированы? '}
                <Link className={styles.link} to={ROUTE_LOGIN}>
                    Войти
                </Link>
            </p>
        </div>
    )
}
