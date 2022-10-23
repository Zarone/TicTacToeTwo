import React from 'react';
import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <span className={styles.tic}>Tick</span>
      <span className={styles.tac}>oaT</span>
      <span className={styles.toe}>Two</span>
    </div>
  );
};
