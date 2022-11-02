import { JoinManager } from './JoinManager';
import { TitleBanner } from './TitleBanner';
import { Footer } from './DFooter';
import React from 'react';
import styles from './GameManager.module.css';

export const GameManager = () => {
  return (
    <div className={styles.bgColor}>
      <TitleBanner />
      <JoinManager />
      <Footer />   
    </div>
  );
};
