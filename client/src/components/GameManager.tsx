import { JoinManager } from './JoinManager';
import React from 'react';
import styles from './GameManager.module.css';

export const GameManager = () => {
  return (
    <div>
      <div className={styles.container}>
        <JoinManager />
      </div>
    </div>
  );
};
