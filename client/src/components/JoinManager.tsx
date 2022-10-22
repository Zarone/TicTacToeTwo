import React from 'react';
import styles from './JoinManager.module.css';

export const JoinManager = () => {
  return (
    <div className={styles.container}>
      <div className={styles['button-container']}>
        <button type="button" className={styles.button}>Join Room</button>
        <input type="text" placeholder='Room ID' className={styles.input} />
      </div>
      <div className={styles['button-container']}>
        <button type="button" className={styles.button}>Create Room</button>
        <input type="text" placeholder='Room ID' className={styles.input} />
      </div>
    </div>
  );
};