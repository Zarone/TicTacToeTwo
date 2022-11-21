import { Server, Socket } from 'socket.io';
import express from 'express';
import http from 'http';
import { Room } from './room';
import scoreboard from './scoreboard';

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

app.use(express.static(__dirname + '/../static'));

const privateRooms: Record<string, Room> = {};
const publicRooms: Record<string, Room> = {};

io.on('connection', (socket: Socket) => {
  console.log('a user connected: ', socket.id);

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    [...Object.values(publicRooms), ...Object.values(privateRooms)].forEach(
      (room: Room) => {
        if (room.hasPlayer(socket.id)) {
          room.leave(socket);
        }
      }
    );
  });

  const createPublicRoom = () => {
    let roomName = nanoid(5);
    while (publicRooms[roomName]) {
      roomName = nanoid(5);
    }

    const room = new Room(roomName);
    room.join(socket);
    publicRooms[roomName] = room;
  };

  const createPrivateRoom = (roomName: string) => {
    if (privateRooms[roomName]) {
      socket.emit('roomUnavailable', roomName);
      return;
    }

    const room = new Room(roomName);
    room.join(socket);
    privateRooms[roomName] = room;
  };

  const findFreeRoom = () => {
    for (const roomId in publicRooms) {
      const room = publicRooms[roomId];

      if (room.playerCount < 2 && !room.hasStarted()) {
        room.join(socket);
        return;
      }
    }

    // no room was present, lets create a new one
    createPublicRoom();
  };

  const joinRoom = (roomId: string) => {
    console.log('attempt to join room: ', roomId);
    const room = publicRooms[roomId] || privateRooms[roomId];
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
    const room = publicRooms[to] || privateRooms[to];
    if (!room) {
      return;
    }

    room.onMessage(socket, event, data);
  };

  socket.on('findFreeRoom', findFreeRoom);
  socket.on('createRoom', createPrivateRoom);
  socket.on('joinRoom', joinRoom);
  socket.on('message', message);

  socket.on('leaveRoom', (roomId: string) => {
    console.log('leave room', roomId);
    const room = publicRooms[roomId] || privateRooms[roomId];
    if (!room) {
      return;
    }

    room.leave(socket);
  });

  socket.on('score', () => {
    socket.emit('score', scoreboard.scores());
  });

  socket.on('listRooms', () => {});
});

server.listen(3001, () => {
  console.log('Listening on ::3001');
});

// Keep this export for jest testing

export default server;
