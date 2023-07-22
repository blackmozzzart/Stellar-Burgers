import React, { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal');

interface ModalProps {
    title?: string;
    children: ReactNode;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
    const { onClose } = props;

    const handleCloseModal = () => {
        onClose()
    }

    useEffect(() => {
        const handleEscapeButton = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }
        document.addEventListener('keyup', handleEscapeButton)
        return () => {
            document.removeEventListener('keyup', handleEscapeButton)
        }
    }, [onClose])

    if (!modalRoot) {
        return null
    }

    return createPortal(
        <ModalOverlay onClick={handleCloseModal}>
            <div className={`${styles.modal} pl-10 pt-10 pb-15 pr-10`}>
                <div className={styles.modalHeader}>
                    {props.title && (
                        <h3 className={`${styles.title} text text_type_main-large`}>{props.title}</h3>
                    )}
                    <div className={styles.icon}>
                        <CloseIcon type='primary' onClick={handleCloseModal} />
                    </div>
                </div>
                {props.children}
            </div>
        </ModalOverlay>, modalRoot
    )
}