import './App.css';
import { Navbar } from './components/Navbar';
import { useSocket } from './hooks/useSocket';
import { GameManager } from './components/GameManager';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const socketData = useSocket(setLoading, setIsPlaying);
  return (
    <div className={'container md:pt-10'}>
      <Navbar 
        socketData={socketData}
      />
      <GameManager 
        setLoading={setLoading}
        loading={loading} 
        socketData={socketData}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <main>react root component</main>
    </div>
  );
}

export default App;
