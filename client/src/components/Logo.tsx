import React from 'react';
import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <span className={styles.tic}>Tic</span>
      <span className={styles.tac}>Tac</span>
      <span className={styles.toe}>Toe</span>
      <span className={styles.two}>2</span>
    </div>
  );
};
