import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import DisconnectReason = Socket.DisconnectReason;
import { logger } from '../helper/logger';
import toast from 'react-hot-toast';

export interface SocketState {
  socket: Socket | null;
  connected: boolean;
}

const initialState: SocketState = {
  socket: null,
  connected: false,
};

export const SocketContext = React.createContext<SocketState>({} as any);

export const SocketContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [state, setState] = useState<SocketState>(initialState);
  console.log('render');
  // update global state whenever the state prop (^^^) changes.
  const setContext = useCallback(
    (updates: Partial<SocketState>) => {
      setState({ ...state, ...updates });
    },
    [state, setState]
  );

  // this updates the context below whenever the state changes, notifing all subscribed components.
  const getContextValue = useCallback(
    () => ({
      ...state,
      setContext,
    }),
    [state, setContext]
  );

  // Enable socket.io debug mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      localStorage.debug = '*';
    }
  }, []);

  // Connect to the socket.io server
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT as string);
    // event subscription
    const connect = () => {
      logger('connected', socket!.id);
      toast.success('Connected');
      setState({ socket, connected: true });
    };

    const disconnect = (reason: DisconnectReason) => {
      logger('disconnected', reason);
      toast.error('Disconnected. Please reload the page');
      setState({ socket, connected: false });
    };

    const roomJoined = (res: any) => {
      navigate(`/play/${res.id}`);
    };

    const roomNotFound = (res: any) => {
      logger('Room not available anymore');
      toast.error('Room not available anymore.');
      navigate('/');
    };

    const roomNotAvailable = () => {
      logger('This room is already full.');
      toast.error('Room is already full.');
      navigate('/');
    };

    socket.on('connect', connect);
    socket.on('disconnect', disconnect);
    socket.on('roomJoined', roomJoined);
    socket.on('roomNotFound', roomNotFound);
    socket.on('roomNotAvailable', roomNotAvailable);

    setState((state) => ({ ...state, socket }));

    // unsubscribe when this component unmounts
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('roomJoined');
      socket.off('roomNotfound');
    };
  }, []);

  return (
    <SocketContext.Provider value={getContextValue()}>
      {children}
    </SocketContext.Provider>
  );
};
