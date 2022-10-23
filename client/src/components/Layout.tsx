import { Navbar } from '../components/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SocketContextProvider } from '../contexts/SocketContext';

export const Layout: React.FC = () => {
  return (
    <SocketContextProvider>
      <div className={'container md:pt-10'}>
        <Navbar />
        <Outlet />
      </div>
    </SocketContextProvider>
  );
};
