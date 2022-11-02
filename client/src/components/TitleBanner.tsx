import React from 'react';
import styles from './TitleBanner.module.css';
import bgImage from '../images/bg-scroll.png';
import titleImage from '../images/logo_white.png';

export const TitleBanner = () => {
  return (
    <div>
      <section className={styles.titleCard}>
        <div className={styles.blackFade}></div>
        <img src={bgImage} alt="" className={styles.bgImage} />
        <div className={styles.titleContainer}>
          <img src={titleImage} alt="" className={styles.titleImage} />
          <p className={styles.createdText}>Created By <a href="https://www.youtube.com/c/OatsJenkins">Oat Jenkins</a></p>
        </div>
      </section>
    </div>
  );
};