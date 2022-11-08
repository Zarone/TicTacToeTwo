import React, { useContext, useState } from 'react';
import styles from './JoinManager.module.css';
import { SocketContext } from '../contexts/SocketContext';
import { Button } from './Button';

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
      <section className={styles.playSection}>
        <h1 className={styles.titleText}>Play</h1>
        <button type="button" className={styles.button} onClick={findFreeRoom}>
          Quick Match
        </button>
        <p className={styles.description}>
          Click the <strong>Quick Match</strong> button to automatically get
          drafted against a random player to play tickOatTwo against.
        </p>

        <div className={styles['buttonInput-container']}>
          <input
            onInput={(e) => setCreateRoomName(e.currentTarget.value)}
            type="text"
            placeholder="Room ID"
            className={styles.input}
          />
          <Button
            type="button"
            onClick={createRoom}
            disabled={!createRoomName}
            text={'Create Room'}
          ></Button>
        </div>

        <div className={styles['buttonInput-container']}>
          <input
            onInput={(e) => setJoinRoomName(e.currentTarget.value)}
            type="text"
            placeholder="Room ID"
            className={styles.input}
          />
          <Button
            type="button"
            onClick={joinRoom}
            disabled={!joinRoomName}
            text={'Join Room'}
          ></Button>
        </div>
      </section>
      <section className={styles.ruleSection}>
        <h1 className={styles.titleText}>Rules</h1>
        <div className={styles.rulesContainer}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ePxrVU4M9uA?start=242"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section className={styles.templateSection}>
        <p style={{ color: 'black' }}>
          template section for any new content to be added
        </p>
      </section>
    </div>
  );
};
