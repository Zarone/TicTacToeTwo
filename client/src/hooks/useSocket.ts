import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface socketData {
  connected: boolean;
  loading: boolean;
  socket:  Socket<any, any> | null;
}

export const useSocket = () => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket|null>(null);

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
      setLoading(false);
      setSocket(socket);
    });

    socket.on('disconnect', (reason) => {
      console.log('[SOCKET DISCONNECT]: ', reason);
      setConnected(false);
    });
  }, []);

  return { loading, connected, socket };
};
