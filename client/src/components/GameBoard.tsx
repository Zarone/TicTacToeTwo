import boardImage from '../images/tictactoeboard.jpg';
import styles from './GameBoard.module.css';

export const GameBoard = () => {
  return (
    <div className={`grid-cols-1 bg-blue-300 rounded-xl ${styles.container}`}>
      <div className={styles.boardImage} style={{backgroundImage: `url(${boardImage})`}}>
        { [1,2,3,4,5,6,7,8,9].map(e=>{
          return <div 
            className={styles.boardTile}
            key={e} 
          >
          </div>;
        }) }
      </div>
    </div>
  );
};
