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
  #winner: string;
  #lastTile: number;
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

        if (!this.isValidTurn(socket, data)) {
          return;
        }

        const playerIndex = this.#players.findIndex((p) => p.id === socket.id);
        const isPlayerTurn = this.#turn % 2 !== playerIndex;

        if (!isPlayerTurn) {
          console.log('not your turn');
          return;
        }

        console.log(data.tile, this.#lastTile);
        if (data.tile === this.#lastTile) {
          console.log('cant play on the same field twice');
          return;
        }

        this.#board[data.tile] =
          this.#board[data.tile] +
          (this.#players.findIndex((s) => s.id === socket.id) + 1);

        this.#lastTile = data.tile;
        this.#turn++;

        console.log('board state: ' + this.#board, this.#board[data.tile]);

        if (this.isGameOver()) {
          this.#state = RoomState.GAME_OVER;
          this.#winner = socket.id;
          console.log('is over');
        }

        break;
    }

    this.broadcast();
  }

  isValidTurn(socket: Socket, data: any) {
    const playerSymbol = this.#players.findIndex((s) => s.id === socket.id) + 1;
    return !(
      this.#board[data.tile] === 3 || this.#board[data.tile] === playerSymbol
    );
  }

  isGameOver() {
    const candidates = [
      // horizontal rows
      this.#board[0] + this.#board[1] + this.#board[2],
      this.#board[3] + this.#board[4] + this.#board[5],
      this.#board[6] + this.#board[7] + this.#board[8],
      // vertical rows
      this.#board[0] + this.#board[3] + this.#board[6],
      this.#board[1] + this.#board[4] + this.#board[7],
      this.#board[2] + this.#board[5] + this.#board[8],
      // axis
      this.#board[0] + this.#board[4] + this.#board[8],
      this.#board[2] + this.#board[4] + this.#board[6],
    ];

    if (candidates.some((s) => s === 9)) {
      // 3 x 3 in a row
      return true;
    }

    return false;
  }

  join(socket: Socket) {
    socket.join(this.#id);
    socket.emit('roomJoined', this.serialize());

    if (!this.#players.find((player) => player.id === socket.id)) {
      this.#players.push(socket);
    }

    this.broadcast();
  }

  leave(socket: Socket) {
    socket.leave(this.#id);
    this.#players = this.#players.filter((player) => player.id !== socket.id);

    this.broadcast();
  }

  serialize() {
    return {
      id: this.#id,
      players: this.#players.map((socket, index) => ({
        id: socket.id,
        isYourTurn: this.#turn % 2 !== index,
        symbol: index === 0 ? 'blue' : 'red',
        winner: this.#winner == socket.id,
      })),
      state: this.#state,
      messages: this.#messages,
      board: this.#board,
    };
  }

  // Call this method whenever room state changes
  broadcast() {
    io.to(this.#id).emit('roomUpdated', this.serialize());
  }

  hasPlayer(id: string) {
    return this.#players.some((player) => player.id === id);
  }

  hasStarted() {
    return this.#board.reduce((acc, p) => acc + p, 0) > 0;
  }

  get playerCount() {
    return this.#players.length;
  }
}
