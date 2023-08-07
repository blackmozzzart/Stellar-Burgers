import React from 'react';
import styles from './loader.module.css';

export const Loader: React.FC = () => (
    <div className={styles.container}>
        <div className={styles.loader} />
    </div>
);
