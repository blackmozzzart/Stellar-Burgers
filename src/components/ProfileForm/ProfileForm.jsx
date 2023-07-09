import React, { useState, useEffect } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profileForm.module.css';
import { useAppSelector } from '../../services/store';
import { refreshTokenThunk, updateUserThunk } from '../../services/actions/user';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';

export const ProfileForm = () => {
    const user = useAppSelector((store) => store.user);
    const [isChanged, setIsChanged] = useState(false);
    const dispatch = useDispatch();
    const { values, handleChange, setValues } = useForm({ name: user.name, email: user.email, password: user.password });

    const onChange = (e) => {
        handleChange(e);
        setIsChanged(true);
    }
    const onCancelChange = () => {
        setValues({ name: user.name, email: user.email, password: '' })
        setIsChanged(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserThunk(values));
        setValues({ ...values, password: '' });
        setIsChanged(false);
    }

    useEffect(() => {
        if (user) {
            setValues({ ...values, name: user.name, email: user.email })
        }
    }, [user]);

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <Input
                onChange={onChange}
                type={"text"}
                placeholder={"Имя"}
                icon={"EditIcon"}
                value={values.name || ''}
                name={"name"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
            />
            <EmailInput
                onChange={onChange}
                placeholder={"Логин"}
                icon={"EditIcon"}
                value={values.email || ''}
                name={"email"}
            />
            <PasswordInput
                onChange={onChange}
                icon={"EditIcon"}
                value={values.password || ''}
                name={"password"}
            />
            {
                isChanged && <div className={styles.buttons_container}>
                    <Button onClick={onCancelChange} type="secondary" size="medium" htmlType='reset'>
                        Отмена
                    </Button>
                    <Button type="primary" size="medium" htmlType='submit'>
                        Сохранить
                    </Button>
                </div>
            }
        </form>
    )
}
