import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../contexts/SocketContext';
import { GameBoard } from '../components/GameBoard';

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
      <div className={'text-center p-20 text-slate-900'}>
        Waiting for another player...
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
        <div className={'text-black flex justify-between'}>
          <span className={'text-blue-400'}>
            BLUE {me!.symbol === 'blue' ? '(YOU)' : ''}
          </span>
          ⚡️
          <span className={'text-red-400'}>
            RED {me!.symbol === 'red' ? '(YOU)' : ''}
          </span>
        </div>
      </div>

      {JSON.stringify(room.state)}

      {room!.state === 'gameOver' && (
        <div
          className={
            'text-center p-10 font-bold text-center text-4xl text-slate-900 mb-20'
          }
        >
          <h2>Game over!</h2>
          <div>Winner: {room!.players!.find((s) => s.winner)?.symbol}</div>
        </div>
      )}

      {room!.state === 'idle' && (
        <>
          <div className={'p-20'}></div>
          <div
            className={'font-bold text-center text-4xl text-slate-900 mb-20'}
          >
            {me.isYourTurn ? 'Your turn!' : 'Enemy turn'}
          </div>

          <GameBoard room={room} />
        </>
      )}
    </div>
  );
};
