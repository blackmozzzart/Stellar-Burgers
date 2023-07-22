import React, { ReactNode, MouseEvent } from 'react';
import styles from './modalOverlay.module.css';

interface ModalOverlayProps {
    children: ReactNode;
    onClick(): void;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
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