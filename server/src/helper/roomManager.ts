export interface Room {
  playerCount: number;
  state: number[];
}

const DEFAULT_STATE = [
  0,0,0,
  0,0,0,
  0,0,0
];

export const findFreeRoom = (rooms: Room[]): [number, boolean] => {
  for (let i = 0; i < rooms.length; i++){
    let thisRoom = rooms[i];
    if (thisRoom.playerCount == 1){
      return [i, false];
    }
  }

  // if there was an available room this function should have already returned. So now just create a new room and return that id.

  rooms.push({playerCount: 1, state: DEFAULT_STATE});
  return [rooms.length-1, true];

}
