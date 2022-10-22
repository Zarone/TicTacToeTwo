import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = () => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Enable socket.io debug mode
    if (process.env.NODE_ENV === 'development') {
      localStorage.debug = '*';
    }
  }, []);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT as string);
    socket.on('connect', () => {
      setConnected(true);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });
  }, []);

  return { loading, connected, socket };
};
