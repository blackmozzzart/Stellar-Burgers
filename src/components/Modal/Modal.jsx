import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Ingredient } from '../../pages/ingredient/ingredient';

const modalRoot = document.getElementById("modal");

export const Modal = (props) => {
    const { onClose } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleCloseModal = (e) => {
        // onClose()
        navigate(-1)
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

    return background && createPortal(
        <Routes>
            <Route path='/ingredients/:id' element={<Ingredient />} />
            <ModalOverlay onClick={handleCloseModal}>
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
        </Routes>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    onClose: PropTypes.func
}