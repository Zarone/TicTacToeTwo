import React from 'react';
import { socketData } from '../hooks/useSocket';
import styles from './JoinManager.module.css';
import { rawPlayGame } from '../helper/socketJoin';

export const JoinManager = (
  {socketData:{socket, connected}, setIsPlaying}: 
  {socketData: socketData, setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>}
) => {
  return (
    <div className={styles.container}>
      <p>{connected ? 'connected' : 'nope'}</p>
      <div className={styles['button-container']}>
        <button type="button" className={styles.button} onClick={()=>{
          rawPlayGame(socket);
          setIsPlaying(true);
        }} >Play Game</button>
      </div>
      <br/>
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
