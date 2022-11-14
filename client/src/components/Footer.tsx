import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <div>
      <div className={styles.footer}>
        <div className={styles.column}>
          <div className={styles.footerTitle + ' ' + 'text-blue-200'}>
            Website Info
          </div>
          Website created by Zach Alfano &{' '}
          <a href={'//github.com/'}>posixpascal</a>, AI by BŁX
          <br />
          Website design updated by TheDeer#8821 on Discord
        </div>
        <div className={styles.column}>
          <div className={styles.footerTitle + ' ' + 'text-blue-200'}>
            Oats Jenkins
          </div>
          <a className="d-link" href="https://www.youtube.com/c/OatsJenkins">
            YouTube
          </a>
          <br />
          <a className="d-link" href="https://www.instagram.com/oatsjenkins/">
            Instagram
          </a>
          <br />
          <a className="d-link" href="https://twitter.com/OatsJenkins?">
            Twitter
          </a>
          <br />
          <a className="d-link" href="https://www.tiktok.com/@oatsjenkins">
            TikTok
          </a>
        </div>
        <div className={styles.column}>
          <div className={styles.footerTitle + ' ' + 'text-blue-200'}>
            TickOatTwo 2 Discord
          </div>
          <div className="d-discord-btn-container">
            <a className="d-discord-anchor" href="https://discord.gg/QdrHwhzC">
              https://discord.gg/QdrHwhzC
            </a>
          </div>
          <span className="d-footer-text-own">Owned by sup lloooll</span>
        </div>
      </div>
    </div>
  );
};
