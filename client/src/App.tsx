import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { JoinManager } from './components/JoinManager';

function App() {
  return (
    <div className={'container md:pt-10'}>
      <Navbar />
      <JoinManager />
      <main>react root component</main>
    </div>
  );
}

export default App;
