import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profileForm.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { updateUserThunk } from '../../services/redux/actions/user';
import { useForm } from '../../hooks/useForm';
import { TUser } from '../../services/redux/types/types';

type FormValues = { name: string, email: string, password: string }

export const ProfileForm: React.FC = () => {
    const user = useAppSelector((store) => store.user) as TUser;
    const [isChanged, setIsChanged] = useState(false);
    const dispatch = useAppDispatch();
    const { values, handleChange, setValues } = useForm<FormValues>({ name: user.name, email: user.email, password: user.password });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        setIsChanged(true);
    }
    const onCancelChange = () => {
        setValues({ name: user.name, email: user.email, password: '' })
        setIsChanged(false);
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUserThunk(values));
        setValues({ ...values, password: '' });
        setIsChanged(false);
    }

    useEffect(() => {
        if (user) {
            setValues((values: any) => ({ ...values, name: user.name, email: user.email }))
        }
    }, [user, setValues]);

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <Input
                onChange={onChange}
                type={'text'}
                placeholder={'Имя'}
                icon={'EditIcon'}
                value={values.name || ''}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <EmailInput
                onChange={onChange}
                placeholder={'Логин'}
                value={values.email || ''}
                name={'email'}
            />
            <PasswordInput
                onChange={onChange}
                icon={'EditIcon'}
                value={values.password || ''}
                name={'password'}
            />
            {
                isChanged && <div className={styles.buttons_container}>
                    <Button onClick={onCancelChange} type='secondary' size='medium' htmlType='reset'>
                        Отмена
                    </Button>
                    <Button type='primary' size='medium' htmlType='submit'>
                        Сохранить
                    </Button>
                </div>
            }
        </form>
    )
}
