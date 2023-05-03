import React from "react";
import PropTypes from 'prop-types';
import styles from './menuItem.module.css';

export const MenuItem = ({ icon, text, href }) => {
    return (
        <a href={href} className={`${styles.item} p-5`}>
            {icon}
            <span className='pl-2 text text_type_main-default'>{text}</span>
        </a>
    )
}

MenuItem.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string,
    href: PropTypes.string
}