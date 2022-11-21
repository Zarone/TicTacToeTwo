import styles from './ProgressBar.module.css';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../contexts/SocketContext';

export const ProgressBar = () => {
  const { socket } = useContext(SocketContext);

  const [score, setScore] = useState({
    red: 0,
    blue: 0,
  });

  useEffect(() => {
    if (!socket) {
      return;
    }

    const interval = setInterval(() => {
      socket.once('score', (newScore) => {
        setScore(newScore);
      });
      socket.emit('score');
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [socket]);

  const redGames = score.red + 1;
  const blueGames = score.blue + 1;
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
              {((blueGames * 100) / totalGames).toFixed(0)}%
            </div>
            <div
              className={styles.progressBarRed}
              style={{
                width: (redGames * 100) / totalGames + '%',
              }}
            >
              {((redGames * 100) / totalGames).toFixed(0)}%
            </div>
          </div>
        </div>
        <div className={styles.progressTitle}>Team Win Count</div>
      </div>
    </div>
  );
};
