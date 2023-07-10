import React from 'react';
import styles from './not-found.module.css';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const NotFound404 = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className='pt-30 text text_type_main-large'>Упс! Ошибка 404</h1>
                    <br />
                    <br />
                    <p className='text text_type_main-medium'>Запрошенная вами страница не существует</p>
                    <br />
                    <br />
                    <p className='text text_type_main-default'>Проверьте адрес или попробуйте</p>
                    <br />
                    <br />
                    <Link to='/' className={styles.link}>
                        <Button type='primary' size='medium' htmlType='button'>Домашнаяя страница</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
