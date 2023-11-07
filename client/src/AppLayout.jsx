import React from 'react';
import NavBar from './components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const AppLayout = (props) => {
  return (
    <div className='container nav-padding'>
      <NavBar />
      <Outlet/>
      {props.children}
    </div>
  );
};

export default AppLayout;
