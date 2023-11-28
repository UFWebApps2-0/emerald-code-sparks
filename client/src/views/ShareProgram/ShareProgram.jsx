import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './ShareProgram.less';

function ShareProgram() {

  return (
    <div className='container nav-padding'>
      <NavBar />

      <div id='activity-container'>
        <div id='header'>
          <div>Programs Shared by Other Students</div>
        </div>
      </div>
    </div>
  );
}

export default ShareProgram;

