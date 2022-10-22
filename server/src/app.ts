import { Socket } from 'socket.io';
import express from 'express';

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('hello world 123');
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
});

server.listen(3001, () => {
  console.log("Listening on ::3001")
});

// Keep this export for jest testing

export default server;
