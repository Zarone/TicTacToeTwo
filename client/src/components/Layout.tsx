import { Navbar } from '../components/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SocketContextProvider } from '../contexts/SocketContext';

export const Layout: React.FC = () => {
  return (
    <SocketContextProvider>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </SocketContextProvider>
  );
};
