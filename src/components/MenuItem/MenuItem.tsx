import React, { ReactNode } from "react";
import { NavLink } from 'react-router-dom';
import styles from './menuItem.module.css';

interface MenuItemProps {
    icon: ReactNode;
    text: string;
    href: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ icon, text, href }) => {
    return (
        <NavLink to={href}>
            {(props) => (
                <div className={`${styles.item} ${props.isActive ? styles.item_active : ''} p-5`}>
                    {icon}
                    <span className='pl-2 text text_type_main-default'>
                        {text}
                    </span>
                </div>
            )}
        </NavLink>
    )
}