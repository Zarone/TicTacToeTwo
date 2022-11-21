import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../contexts/SocketContext';
import { GameBoard } from '../components/GameBoard';
import { JoinManager } from '../components/JoinManager';
import styles from '../components/JoinManager.module.css';

interface RoomPlayer {
  id: string;
  isYourTurn: boolean;
  symbol: 'blue' | 'red';
  winner: boolean;
}

export interface Room {
  id: number;
  messages: string[];
  players: Array<RoomPlayer>;
  board: number[];
  state: 'idle' | 'gameOver';
}

export const RoomPage: React.FC = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState<Partial<Room>>({
    messages: [],
  });
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const roomUpdated = (data: Partial<Room>) => {
      setRoom((room) => ({ ...room, ...data }));
    };

    socket.on('roomUpdated', roomUpdated);
    socket.on('roomJoined', roomUpdated);

    socket.emit('joinRoom', roomId);

    return () => {
      socket.emit('leaveRoom', roomId);
      socket.off('roomUpdated');
    };
  }, [socket]);

  const findFreeRoom = () => {
    socket!.emit('findFreeRoom');
  };

  const ping = () => {
    socket!.emit('message', {
      event: 'ping',
      data: {},
      to: roomId,
    });
  };

  if (!room.id) {
    return (
      <div className={'p-5 text-center text-slate-900'}>
        Connecting to Room...
      </div>
    );
  }

  const me = room.players!.find((room) => socket!.id === room.id);

  if (room && room!.players!.length < 2) {
    return (
      <div>
        <div
          className={
            'text-center flex flex-col items-center mt-20 text-slate-900'
          }
        >
          <div className={'mb-12 text-3xl font-bold'}>
            <h2>
              Room ID: <span className={'font-mono'}>{roomId}</span>
            </h2>
          </div>
          <svg
            aria-hidden="true"
            className="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-300"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <div className={'my-2 mb-8'}>Waiting for another player...</div>
          <br />
          <br />
          Invite them using this link:
          <textarea
            rows={1}
            className={
              'rounded-md p-5 shadow-md font-mono w-full h-auto text-center'
            }
          >
            {window.location.href}
          </textarea>
        </div>
      </div>
    );
  }

  if (!me) {
    return <div>Spectator not possible</div>;
  }

  return (
    <div>
      <div
        className={
          'text-center text-amber-900 w-full max-w-[600px] mx-auto my-10 text-4xl p-5'
        }
      >
        <div className={'text-black flex justify-center gap-2'}>
          You&apos;re playing as
          {me!.symbol === 'blue' && (
            <span className={'text-blue-400'}>BLUE</span>
          )}
          {me!.symbol === 'red' && <span className={'text-red-400'}>RED</span>}
        </div>
      </div>

      {room!.state === 'gameOver' && (
        <div className={'text-center font-bold text-center mb-20'}>
          <h2 className={'text-4xl px-10 text-slate-900 '}>
            {me.winner ? 'You won! :)' : 'You lost :('}
          </h2>
          <button
            type="button"
            className={styles.button}
            style={{ marginBlock: '50px' }}
            onClick={findFreeRoom}
          >
            Play another round
          </button>
          <div className={'opacity-50 pointer-events-none'}>
            <GameBoard room={room} />
          </div>
        </div>
      )}

      {room!.state === 'idle' && (
        <>
          <div className={'p-4'}></div>
          <div
            className={'font-bold text-center text-4xl text-slate-900 mb-20'}
          >
            {me.isYourTurn ? 'Your turn!' : 'Enemy turn'}
          </div>

          <GameBoard room={room} />
        </>
      )}
      <JoinManager />
    </div>
  );
};
