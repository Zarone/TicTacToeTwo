import { Logo } from './Logo';
import React from 'react';
import { SocketStatus } from './SocketStatus';
import { socketData } from '../hooks/useSocket';

export const Navbar = ({socketData}: {socketData: socketData}) => {
  return (
    <nav className={'flex justify-between items-center'}>
      <span>left</span>
      <Logo />
      <span>
        <SocketStatus socketData={socketData}/>
      </span>
    </nav>
  );
};
