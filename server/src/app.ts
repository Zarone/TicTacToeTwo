import { Socket, Server } from 'socket.io';
import express from 'express';
import http from 'http';
import { Room, findFreeRoom } from './helper/roomManager';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// these are used when the user just hits play game
let keylessRooms: Room[] = [];

// these are used when the user enters a specific game id
//let keyedRooms = {};

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('hello world');
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });

  socket.on('rawPlayGame', ()=>{
    let [gameID, newRoom] = findFreeRoom(keylessRooms);
    socket.join(gameID.toString());
    socket.emit('init', {gameID, playerOne: newRoom});
    if (!newRoom) keylessRooms[gameID].playerCount++;
  });
});

server.listen(3001, () => {
  console.log('Listening on ::3001');
});

// Keep this export for jest testing

export default server;
