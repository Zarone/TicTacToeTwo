import React from 'react';
import { useSocket } from '../hooks/useSocket';

export const SocketStatus = () => {
  const { socket, connected } = useSocket();
  return <div>{connected ? 'connected' : 'not connected'}</div>;
};
