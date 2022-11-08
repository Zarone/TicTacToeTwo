import React from 'react';
import { Outlet } from 'react-router-dom';
import { SocketContextProvider } from '../contexts/SocketContext';
import { Footer } from './Footer';
import { TitleBanner } from './TitleBanner';

export const Layout: React.FC = () => {
  return (
    <SocketContextProvider>
      <div>
        <TitleBanner />

        <div className={'container'}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </SocketContextProvider>
  );
};
