import React from 'react';
import styles from './TitleBanner.module.css';
import bgImage from '../images/bg-scroll.png';
import titleImage from '../images/logo_white.png';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

export const TitleBanner = () => {
  const showActions = window.location.href.includes('/play/');
  const navigate = useNavigate();

  return (
    <div>
      <section className={styles.titleCard}>
        <div className={styles.blackFade}></div>
        <img src={bgImage} alt="" className={styles.bgImage} />

        <div className={styles.titleContainer}>
          <img src={titleImage} alt="" className={styles.titleImage} />
          {showActions ? (
            <>
              <div className={'mt-5'}>
                <Button
                  type="button"
                  onClick={() => navigate('/')}
                  text={'Go back'}
                ></Button>
              </div>
            </>
          ) : (
            <>
              <p className={styles.createdText}>
                Created By{' '}
                <a href="https://www.youtube.com/c/OatsJenkins">Oat Jenkins</a>
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
