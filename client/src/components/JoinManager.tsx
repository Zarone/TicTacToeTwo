import React, { useContext, useState } from 'react';
import styles from './JoinManager.module.css';
import { SocketContext } from '../contexts/SocketContext';

export const JoinManager = () => {
  const { socket } = useContext(SocketContext);
  const [joinRoomName, setJoinRoomName] = useState('');
  const [createRoomName, setCreateRoomName] = useState('');

  const createRoom = () => {
    socket!.emit('createRoom', createRoomName);
  };

  const joinRoom = () => {
    socket!.emit('joinRoom', joinRoomName);
  };

  const findFreeRoom = () => {
    socket!.emit('findFreeRoom');
  };

  return (
    <div className={styles.container}>
      <div className={styles['button-container']}>
        <button type="button" className={styles.button} onClick={findFreeRoom}>
          Play Game
        </button>
      </div>
      <br />
      <div className={styles['button-container']}>
        <button type="button" onClick={joinRoom} className={styles.button}>
          Join Room
        </button>
        <input
          onInput={(e) => setJoinRoomName(e.currentTarget.value)}
          type="text"
          placeholder="Room ID"
          className={styles.input}
        />
      </div>
      <div className={styles['button-container']}>
        <button type="button" onClick={createRoom} className={styles.button}>
          Create Room
        </button>
        <input
          onInput={(e) => setCreateRoomName(e.currentTarget.value)}
          type="text"
          placeholder="Room ID"
          className={styles.input}
        />
      </div>
    </div>
  );
};
