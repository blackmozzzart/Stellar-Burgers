import React from "react";
import styles from './menuItem.module.css';

export const MenuItem = ({ icon, text }) => {
    return (
        <div className={`${styles.item} p-5`}>
            {icon}
            <span className='pl-2 text text_type_main-default'>{text}</span>
        </div>
    )
}