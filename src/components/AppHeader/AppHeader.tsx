import React from 'react';
import { MenuItem } from '../MenuItem';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './appHeader.module.css';

export const AppHeader: React.FC = () => {

    return (
        <header className={`${styles.header} p-4`}>
            <div className={`container ${styles.headerInner}`}>
                <nav className={styles.nav}>
                    <MenuItem
                        href={'/'}
                        icon={<BurgerIcon type='primary' />}
                        text={'Конструктор'}
                    />
                    <MenuItem
                        href={'/feed'}
                        icon={<ListIcon type='primary' />}
                        text={'Лента заказов'}
                    />
                </nav>
                <Logo />
                <nav className={`${styles.nav} ${styles.nav_right}`}>
                    <MenuItem
                        href={'/profile'}
                        icon={<ProfileIcon type='primary' />}
                        text={'Личный кабинет'}
                    />
                </nav>
            </div>
        </header>
    )
}