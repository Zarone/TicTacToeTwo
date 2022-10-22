import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { JoinManager } from './components/JoinManager';
import { useSocket } from './hooks/useSocket';
import { GameManager } from './components/GameManager';

function App() {
  const socketData = useSocket();
  return (
    <div className={'container md:pt-10'}>
      <Navbar socketData={socketData}/>
      <GameManager socketData={socketData}/>
      <main>react root component</main>
    </div>
  );
}

export default App;
