import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import './StudentPortal.less';
import NavBar from '../../components/NavBar/NavBar';
import { useGlobalState } from '../../Utils/userState';
import { useNavigate } from 'react-router-dom';

export default function StudentPortal() {
  const [value] = useGlobalState('currUser');
  const navigate = useNavigate();
  let nameS = localStorage.getItem('studentName');

  const handleClassroomActivitiesClick = () => {
    navigate('/student');
  };

  const handleProgramGalleryClick = () => {
    //TODO: navigate to proper url route
    navigate('/');
  };

  const handleSharedProgramsClick = () => {
    navigate('/share-program');
  };

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='main-header'>Welcome {nameS}</div>
      <div id='classrooms-container'>
        <div id='header2'>Choose an option below to start</div>
        
          <div id='dashboard-card1'>
            <div id='card-title2'>Classroom Activities</div>
            <button id='box2' onClick={handleClassroomActivitiesClick}>Choose Activities</button>
          </div>

          <div id='dashboard-card1'>
            <div id='card-title2'>Program Gallery</div>
            <button id='box2' onClick={handleProgramGalleryClick}>Create Your Program</button>
          </div>

          <div id='dashboard-card1'>
            <div id='card-title2'>Shared Programs</div>
            <button id='box2' onClick={handleSharedProgramsClick}>Explore Shared Programs</button>
          </div>
        
      </div>
    </div>
  );
}
