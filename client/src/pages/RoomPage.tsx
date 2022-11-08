import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../contexts/SocketContext';
import { GameBoard } from '../components/GameBoard';

interface RoomPlayer {
  id: string;
  isYourTurn: boolean;
}

export interface Room {
  id: number;
  messages: string[];
  players: Array<RoomPlayer>;
  board: number[];
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

  const me = room.players!.find((room) => socket!.id === room.id);
  console.log(room.players, socket!.id, me);
  return (
    <div>
      <div
        className={
          'text-center text-amber-900 w-full max-w-[600px] mx-auto my-10 text-4xl p-5'
        }
      >
        <div className={'flex justify-between'}>
          <span>YOU</span> vs <span>RED</span>
        </div>
        <div>underline</div>
      </div>

      <GameBoard room={room} />
    </div>
  );
};
