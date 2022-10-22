import { JoinManager } from './JoinManager';
import { socketData } from '../hooks/useSocket';
import React, { useState } from 'react';

export const GameManager = ({socketData}: {socketData:socketData}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div>
      {isPlaying ? <p>gameboard</p> : <JoinManager setIsPlaying={setIsPlaying} socketData={socketData} />}
    </div>
  );
};