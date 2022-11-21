import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { IndexPage } from './pages/IndexPage';
import { RoomPage } from './pages/RoomPage';
import { Layout } from './components/Layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={''} element={<IndexPage />} />
        <Route path="/play/:roomId" element={<RoomPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
