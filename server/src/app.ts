import { Socket, Server } from 'socket.io';
import express from 'express';
import http from 'http';
import { Room } from './room';

const nanoid = require('nanoid');
const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const rooms: Record<string, Room> = {};

io.on('connection', (socket: Socket) => {
  console.log('a user connected: ', socket.id);

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });

  const createRoom = (roomName: string = '') => {
    let roomId = roomName || nanoid(5);
    while (rooms[roomId]) {
      roomId = nanoid(5);
    }

    const room = new Room(roomId);
    room.join(socket);

    rooms[roomId] = room;
  };

  const joinRoom = (roomId: string) => {
    console.log('attempt to join room: ', roomId);
    const room = rooms[roomId];
    if (!room) {
      socket.emit('roomNotFound', roomId);
      return;
    }

    room.join(socket);
  };

  const message = ({
    to,
    event,
    data,
  }: {
    to: string;
    event: string;
    data: any;
  }) => {
    const room = rooms[to];
    if (!room) {
      return;
    }

    room.onMessage(socket, event, data);
  };

  socket.on('findFreeRoom', () => {
    for (const roomId in rooms) {
      const room = rooms[roomId];

      if (room.playerCount < 2) {
        room.join(socket);
        return;
      }
    }

    // no room was present, lets create a new one
    createRoom();
  });

  socket.on('createRoom', createRoom);
  socket.on('joinRoom', joinRoom);
  socket.on('message', message);

  socket.on('leaveRoom', (roomId: string) => {
    console.log('leave room', roomId);
    const room = rooms[roomId];
    if (!room) {
      return;
    }

    room.leave(socket);
  });

  socket.on('listRooms', () => {});
});

server.listen(3001, () => {
  console.log('Listening on ::3001');
});

// Keep this export for jest testing

export default server;
