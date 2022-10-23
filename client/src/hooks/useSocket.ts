import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export interface socketData {
  connected: boolean;
  socket:  Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

export const useSocket = (
  setLoading: (arg: boolean)=>void,
  setIsPlaying: (arg: boolean)=>void
) => {
  const [connected, setConnected] = useState(false);
  //const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket|null>(null);

  useEffect(() => {
    // Enable socket.io debug mode
    if (process.env.NODE_ENV === 'development') {
      localStorage.debug = '*';
    }
  }, []);

  useEffect(() => {
    const socketScoped = io(process.env.REACT_APP_SOCKET_ENDPOINT as string);
    socketScoped.on('connect', () => {
      console.log('connected');
      setConnected(true);
      setLoading(false);
      setSocket(socketScoped);
    });

    socketScoped.on('disconnect', (reason) => {
      console.log('[SOCKET DISCONNECT]: ', reason);
      setConnected(false);
    });

    socketScoped.on('init', (res)=>{
      setLoading(false);
      setIsPlaying(true);
      console.log('res', res);
    });

    return () => {
      if (socket && connected) {
        socket.disconnect();
      }
    };
  }, []);

  return { connected, socket };
};
