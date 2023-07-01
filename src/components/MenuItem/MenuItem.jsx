import React from "react";
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './menuItem.module.css';

export const MenuItem = ({ icon, text, href }) => {
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

MenuItem.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string,
    href: PropTypes.string
}