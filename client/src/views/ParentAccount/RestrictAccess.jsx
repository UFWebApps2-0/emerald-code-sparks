import React, { useState } from 'react';
import { Switch } from 'antd';
import './Parent.less'; 
import NavBar from '../../components/NavBar/NavBar';
import MentorSubHeader from '../../components/MentorSubHeader/MentorSubHeader';

export default function ManageAccessPage() {
  const [isSharingEnabled, setIsSharingEnabled] = useState(true);

  const toggleSharing = (checked) => {
    setIsSharingEnabled(checked);
    //TODO: Add logic to handle the change in sharing access state
  };

  return (
    <div className='container nav-padding'>
      <NavBar isMentor={true} />
      <MentorSubHeader title={'Access Management'}></MentorSubHeader>
      <div id='classrooms-container'>
        <div id='dashboard-card-container'>
          <div id='dashboard-class-card' className='flex flex-row justify-between items-center'>
            <div id='card-left-content-container'>
              <h1 id='card-title'>Sharing Feature</h1>
            </div>
            <div id='card-left-content-container' className='flex flex-row items-center'>
              <Switch checked={isSharingEnabled} onChange={toggleSharing} />
              <span id='access-toggle-label' className='ml-2'>{isSharingEnabled ? 'On' : 'Off'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
