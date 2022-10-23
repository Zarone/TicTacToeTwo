import { JoinManager } from './JoinManager';
import { socketData } from '../hooks/useSocket';
import React, { useState } from 'react';
import styles from './GameManager.module.css';

export const GameManager = (
  {
    socketData, loading, setLoading, 
    isPlaying, setIsPlaying
  }: 
  {
    socketData:socketData, 
    loading: boolean,
    setLoading: (arg:boolean)=>void,
    isPlaying: boolean,
    setIsPlaying: (arg:boolean)=>void
  }
) => {
  return (
    <div>
      <div className={styles.container}>
        {
          loading
            ? <p>loading</p>
            : isPlaying 
              ? <p>gameboard</p> 
              : <JoinManager   
                setIsPlaying={setIsPlaying}
                socketData={socketData} 
                setLoading={setLoading}
              />
        }
      </div>
    </div>
  );
};
