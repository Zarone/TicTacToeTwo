import React from 'react';
import { socketData } from '../hooks/useSocket';
import styles from './JoinManager.module.css';
import { rawPlayGame } from '../helper/socketJoin';

export const JoinManager = (
  {
    socketData:{socket, connected}, 
    setIsPlaying, 
    setLoading
  }: 
  {
    socketData: socketData, 
    setIsPlaying: (arg:boolean)=>void,
    setLoading: (arg:boolean)=>void
  }
) => {
  return (
    <div className={styles.container}>
      <p>{connected ? 'connected' : 'nope'}</p>
      <div className={styles['button-container']}>
        <button type="button" className={styles.button} onClick={()=>{
          rawPlayGame(socket);
          setLoading(true);
          //setIsPlaying(true);
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
