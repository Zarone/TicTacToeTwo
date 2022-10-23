import { Socket } from 'socket.io';
import { io } from './app';

enum RoomState {
  IDLE = 'idle',
  READY = 'ready',
  GAME_OVER = 'gameOver',
  STALE = 'stale', // when no user is in the room
}

export class Room {
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
