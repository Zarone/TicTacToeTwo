import React from 'react';
import { Outlet } from 'react-router-dom';
import { SocketContextProvider } from '../contexts/SocketContext';
import { Footer } from './Footer';
import { TitleBanner } from './TitleBanner';
import { ProgressBar } from './ProgressBar';

export const Layout: React.FC = () => {
  return (
    <SocketContextProvider>
      <div>
        <TitleBanner />
        <ProgressBar />

        <div className={'container'}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </SocketContextProvider>
  );
};
