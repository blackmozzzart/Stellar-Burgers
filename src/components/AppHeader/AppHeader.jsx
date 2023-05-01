import React from 'react';
import { MenuItem } from '../MenuItem';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './appHeader.module.css';

export const AppHeader = () => {

    return (
        <div className={`${styles.header} p-4`}>
            <div className={`container ${styles.headerInner}`}>
                <div className={styles.nav}>
                    <MenuItem
                        icon={<BurgerIcon />}
                        text={'Конструктор'}
                    />
                    <MenuItem
                        icon={<ListIcon />}
                        text={'Лента заказов'}
                    />
                </div>
                <Logo />
                <div className={`${styles.nav} ${styles.nav_right}`}>
                    <MenuItem
                        icon={<ProfileIcon />}
                        text={'Личный кабинет'}
                    />
                </div>
            </div>
        </div>
    )
}