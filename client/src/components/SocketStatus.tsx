import React from 'react';
import { socketData, useSocket } from '../hooks/useSocket';

export const SocketStatus = ({socketData}: {socketData:socketData}) => {
  return <div>{socketData.connected ? 'connected' : 'not connected'}</div>;
};
