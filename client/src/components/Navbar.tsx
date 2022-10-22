import { Logo } from './Logo';
import React from 'react';
import { SocketStatus } from './SocketStatus';

export const Navbar = () => {
  return (
    <nav className={'flex justify-between items-center'}>
      <span>left</span>
      <Logo />
      <span>
        <SocketStatus />
      </span>
    </nav>
  );
};
