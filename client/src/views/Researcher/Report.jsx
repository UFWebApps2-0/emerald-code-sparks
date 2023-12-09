import NavBar from '../../components/NavBar/NavBar';
import RouteButton from '../../components/RouteButton/RouteButton';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Report.less';

export default function Report(props) {
  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='main-header'>Welcome Researcher!</div>
      <h1 id='report-subheader'>Reports</h1>
      <div id='button-container'>
        <Link to={'/researcher/studyLevel'}>
          <button
            id={'route-button'}
            className={`btn-${'primary'} btn-${'sm'}`}
            type='button'
          >
            Study Level Report
          </button>
        </Link>
        <Link to={'/activityLevel'}>
          <button
            id={'route-button'}
            className={`btn-${'primary'} btn-${'sm'}`}
            type='button'
          >
            Activity Level Report
          </button>
        </Link>
      </div>
    </div>
  );
}
