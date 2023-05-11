import React from 'react';
import PropTypes from 'prop-types';
import styles from './modalOverlay.module.css';

export const ModalOverlay = (props) => {
    const handleClick = (event) => {
        if (event.target === event.currentTarget) {
            props.onClick()
        }
    }

    return (
        <div
            className={styles.overlay}
            onClick={handleClick}
        >
            {props.children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}