import React, { useState } from 'react';
import '../Moderation/Moderation.css';
import TeacherRole from './ModerationTeacher';
import AdminRole from './ModerationAdmin';

export default function OrganizationModeration() {
  const [role, setRole] = useState('teacher'); // teacher or Admin

  const toggleRole = () => {
    setRole(role === 'teacher' ? 'administrator' : 'teacher');
  };

  return (
    <div>
      <div id="main-header2">Moderation Tools</div>
      <div>
        <div>
          <div className="switch-role">
            <span className="switch-role-tag">Switch Role: </span>
            <button onClick={toggleRole} className="switch-role-btn">
              {role === 'teacher' ? 'Teacher' : 'Administrator'}
            </button>
          </div>
          {role === 'teacher' && <TeacherRole />}
          {role === 'administrator' && <AdminRole />}
        </div>
      </div>
    </div>
  );
}
