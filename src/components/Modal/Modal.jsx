import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modal");

export const Modal = (props) => {
    const { onClose } = props;

    const handleCloseModal = (e) => {
        e.stopPropagation()
        onClose()
    }

    useEffect(() => {
        const handleEscapeButton = (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }
        document.addEventListener('keyup', handleEscapeButton)
        return () => {
            document.removeEventListener('keyup', handleEscapeButton)
        }
    }, [onClose])

    if (!props.isOpen) {
        return null;
    }

    return createPortal(
        <ModalOverlay>
            <div className={`${styles.modal} pl-10 pt-10 pb-15 pr-10`}>
                <div className={styles.modalHeader}>
                    {props.title && (
                        <h3 className={`${styles.title} text text_type_main-large`}>{props.title}</h3>
                    )}
                    <div className={styles.icon}>
                        <CloseIcon type="primary" onClick={handleCloseModal} />
                    </div>
                </div>
                {props.children}
            </div>
        </ModalOverlay>, modalRoot
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}