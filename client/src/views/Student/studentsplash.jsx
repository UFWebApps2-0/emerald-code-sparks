/*import React from 'react';
import './studentsplash.less'; // Assuming your LESS file is named style.less

const StudyNotificationPage = ({ backgroundColor }) => {
  return (
    <div className="StudyNotificationPage" style={{ backgroundColor }}>
      <ResearcherProfileSection />
      <StudyDescriptionSection />
      <PrivacyPermissionsSection />
      <button className="submit-button">Submit</button>
    </div>
  );
};

const ResearcherProfileSection = () => {
  const researchers = [
    { name: 'Dr. Smith', bio: 'Researcher in Computer Science' },
    { name: 'Dr. Johnson', bio: 'Expert in Data Analysis' },
    // Add more researchers as needed
  ];

  return (
    <div className="ResearcherProfileSection">
      {researchers.map((researcher, index) => (
        <div className="ResearcherProfile" key={index}>
          <h3>{researcher.name}</h3>
          <p>{researcher.bio}</p>
        </div>
      ))}
    </div>
  );
};

const StudyDescriptionSection = () => {
  return (
    <div className="StudyDescriptionSection">
      <h2>Description of the Study</h2>
      <p>This study aims to explore...</p>
      {/* Add more description as needed }
    </div>
  );
};

const PrivacyPermissionsSection = () => {
  const permissions = [
    'Look at code replays',
    'Access grades',
    'Publish personal information',
    // Add more permissions as needed
  ];

  return (
    <div className="PrivacyPermissionsSection">
      {permissions.map((permission, index) => (
        <div className="PrivacyPermissionItem" key={index}>
          <input type="checkbox" id={permission} name={permission} />
          <label htmlFor={permission}>{permission}</label>
        </div>
      ))}
    </div>
  );
};

export default StudyNotificationPage;
*/
import React from 'react';
import NavBar from '../../components/NavBar/NavBar'; // Adjust the import path as per your project structure
import '../Researcher/CreateStudyPage.less'; // Reusing your existing .less file

const StudyNotificationPage = () => {
  // Add state and functions as needed

  return (
    <div className='container nav-padding'>
      <NavBar /> {/* NavBar component */}
      <div className='content-wrapper'>
        <div className='menu-bar'>
          <div id='notification-study-header'>You Have Been Selected for a Study</div>
        </div>

        <div className='main-content'>
          <h1 className="section-header">Researcher Profiles</h1>
          {/* Add researcher profiles here */}

          <h1 className="section-header">Study Description</h1>
          <p className='study-description'>
            {/* Add study description here */}
          </p>

          <div className='privacy-permissions'>
            {/* Replace with privacy permission checkboxes */}
          </div>

          <button
            className='submit-button'
            onClick={() => {/* Submit action */}}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyNotificationPage;
