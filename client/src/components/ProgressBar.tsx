import styles from './ProgressBar.module.css';

export const ProgressBar = () => {
  const redGames = 600;
  const blueGames = 200;
  const totalGames = redGames + blueGames;

  return (
    <div>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressInner}>
            <div
              className={styles.progressBarBlue}
              style={{
                width: (blueGames * 100) / totalGames + '%',
              }}
            >
              {blueGames}
            </div>
            <div
              className={styles.progressBarRed}
              style={{
                width: (redGames * 100) / totalGames + '%',
              }}
            >
              {redGames}
            </div>
          </div>
        </div>
        <div className={styles.progressTitle}>Team Win Count</div>
      </div>
    </div>
  );
};
