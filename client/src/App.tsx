import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className={'container md:pt-10'}>
      <Navbar />
      <main>react root component</main>
    </div>
  );
}

export default App;
