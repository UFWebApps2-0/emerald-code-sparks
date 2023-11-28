import React, { useState } from 'react';
import '../Moderation/Moderation.css';
import TeacherRole from './ModerationTeacher';
import AdminRole from './ModerationAdmin';

export default function OrganizationModeration(props) {
  const [role, setRole] = useState('administrator'); // teacher or Admin

  const toggleRole = () => {
    setRole(role === 'administrator' ? 'teacher' : 'administrator');
  };

  return (
    <div>
      <div id="main-header2">Moderation Tools</div>
      <div>
        <div>
          <div className="switch-role">
            <span className="switch-role-tag">Switch Role: </span>
            <button onClick={toggleRole} className="switch-role-btn">
              {role === 'administrator' ? 'Administrator' : 'Teacher'}
            </button>
          </div>
          {role === 'teacher' && <TeacherRole />}
          {role === 'administrator' && <AdminRole />}
        </div>
      </div>
    </div>
  );
}
