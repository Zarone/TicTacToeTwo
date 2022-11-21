import React from 'react';
import { Outlet } from 'react-router-dom';
import { SocketContextProvider } from '../contexts/SocketContext';
import { Footer } from './Footer';
import { TitleBanner } from './TitleBanner';
import { ProgressBar } from './ProgressBar';
import { Toaster } from 'react-hot-toast';

export const Layout: React.FC = () => {
  return (
    <SocketContextProvider>
      <div>
        <TitleBanner />
        <ProgressBar />
        <Toaster />
        <div className={'container'}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </SocketContextProvider>
  );
};
