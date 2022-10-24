import boardImage from '../images/tictactoeboard.jpg';
import styles from './GameBoard.module.css';
import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import { Room } from '../pages/RoomPage';

export const GameBoard = ({ room }:
  {room: Partial<Room>}
) => {
  const { socket } = useContext(SocketContext);

  const tileClick = (tile: number) => {
    if (!socket) throw new Error('socket null');
    socket?.emit('message', {to:room.id, event:'placement', data: {tile}});
  };

  return (
    <div className={`grid-cols-1 bg-blue-300 rounded-xl ${styles.container}`}>
      <div className={styles.boardImage} style={{backgroundImage: `url(${boardImage})`}}>
        { [0,1,2,3,4,5,6,7,8].map(e=>{
          return <div 
            className={styles.boardTile}
            key={e} 
            onClick={()=>tileClick(e)}
          >
          </div>;
        }) }
      </div>
    </div>
  );
};
