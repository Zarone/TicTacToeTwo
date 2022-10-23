import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../contexts/SocketContext';
import { GameBoard } from '../components/GameBoard';

interface Room {
  id: number;
  messages: string[];
  players: string[];
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
    return <div>Connecting to Room...</div>;
  }

  return (
    <div>
      <GameBoard />
      <div className={'grid grid-cols-2'}>
        <div className={'grid-cols-1 rounded-xl'}>Room ID: {room.id}</div>
        <div>Players: {room.players!.join(' & ')}</div>
      </div>

      <div className={'grid grid-cols-2'}>
        <div className={'grid-cols-1 bg-blue-300 rounded-xl'}>
          {room.messages!.map((message) => {
            return (
              <div className={'p-2 text-slate-900'} key={message}>
                {message}
              </div>
            );
          })}
        </div>
        <div className={'grid-cols-1 items-start p-5'}>
          <button
            className={
              'w-full text-center rounded-xl bg-slate-900 text-blue-300 block px-4 py-2'
            }
            onClick={ping}
          >
            Send Ping to Room
          </button>
        </div>
      </div>
    </div>
  );
};
