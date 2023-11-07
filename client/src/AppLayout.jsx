import React from 'react';
import NavBar from './components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className='container nav-padding'>
      <NavBar />
      <Outlet/>
    </div>
  );
};

export default AppLayout;
