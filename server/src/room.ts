import { Socket } from 'socket.io';
import { io } from './app';

enum RoomState {
  IDLE = 'idle',
  READY = 'ready',
  GAME_OVER = 'gameOver',
  STALE = 'stale', // when no user is in the room
}
export class Room {
  // 0 is empty, 1 is blue, 2 is red, 3 is both
  #board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  #id: string;
  #players: Socket[] = [];
  #turn = 1;
  #messages: string[] = [];
  #state: string = RoomState.IDLE;

  constructor(id: string) {
    this.#id = id;
  }

  onMessage(socket: Socket, event: string, data: any) {
    console.log(this.#id, 'received message: ', event, data);
    switch (event) {
      case 'ping':
        this.#messages.push(`${socket.id} PONG`);
        break;
      case 'placement':
        console.log('placement', data);
        let isPlayerOne = this.#players[0].id==socket.id;
        console.log('isPlayerOne: ' + isPlayerOne);
        this.#messages.push(`${socket.id} placed ${isPlayerOne ? 'blue' : 'red'} at ${data.tile}`);

        //if (this.#state == RoomState.READY && #turn % 2 == isPlayerOne){
        if (isPlayerOne) {
          if (this.#board[data.tile]==2){
            this.#board[data.tile] = 3;
          } else if (this.#board[data.tile]==1){
            return "Already at location";
          } else if (this.#board[data.tile]==0){
            this.#board[data.tile] = 1;
          } else {
            return "Data.tile is invalid: " + data.tile
          }
        } else {
          if (this.#board[data.tile]==1){
            this.#board[data.tile] = 3;
          } else if (this.#board[data.tile]==2){
            return "Already at location";
          } else if (this.#board[data.tile]==0){
            this.#board[data.tile] = 2;
          } else {
            return "Data.tile is invalid: " + data.tile
          }
        }
        //}
        console.log('board state: ' + this.#board, this.#board[data.tile]);
        break;
    }

    this.broadcast();
  }

  join(socket: Socket) {
    socket.join(this.#id);
    this.#players.push(socket);

    this.broadcast();
    socket.emit('roomJoined', this.serialize());
  }

  leave(socket: Socket) {
    socket.leave(this.#id);
    this.#players = this.#players.filter((player) => player.id !== socket.id);

    this.broadcast();
  }

  serialize() {
    return {
      id: this.#id,
      players: this.#players.map((socket) => socket.id),
      messages: this.#messages,
      board: this.#board
    };
  }

  // Call this method whenever room state changes
  broadcast() {
    io.to(this.#id).emit('roomUpdated', this.serialize());
  }

  get playerCount() {
    return this.#players.length;
  }
}
