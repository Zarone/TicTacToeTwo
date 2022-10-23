import { Logo } from './Logo';
import React, { useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { socket } = useContext(SocketContext);
  return (
    <Link to={'/'}>
      <nav className={'flex justify-between items-center'}>
        <span>left</span>
        <Logo />
        <span>Socket ID: {socket ? socket!.id : ''}</span>
      </nav>
    </Link>
  );
};
