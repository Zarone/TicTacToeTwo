import { GameManager } from '../components/GameManager';
import React, { useState } from 'react';

export const IndexPage = () => {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  return <GameManager />;
};
