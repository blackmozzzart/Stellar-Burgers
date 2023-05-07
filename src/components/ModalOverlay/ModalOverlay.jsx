import React from 'react';
import PropTypes from 'prop-types';
import styles from './modalOverlay.module.css';

export const ModalOverlay = (props) => {
    return (
        <div className={styles.overlay}>{props.children}</div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired
}