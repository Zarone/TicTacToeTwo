import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';

export const rawPlayGame = (socket: Socket<DefaultEventsMap, DefaultEventsMap>|null) => {
  if (!socket) throw new Error('Attempted to join game with null socket');
  socket.emit('rawPlayGame', 0);
};

