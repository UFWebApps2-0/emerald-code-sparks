import React, { useState } from 'react';
import '../Moderation/Moderation.css';
import ClassroomForm from './AdminModComponents/ClassroomForm';

const ModerationAdmin = () => {
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    'Classroom Management Tools'
  );
  const [classrooms, setClassrooms] = useState([]);

  const handleCreateClassroom = (classroom) => {
    setClassrooms([...classrooms, { ...classroom, id: Date.now() }]);
  };

  const handleDeleteClassroom = (classroomId) => {
    setClassrooms(
      classrooms.filter((classroom) => classroom.id !== classroomId)
    );
  };

  const settingsCategories = [
    'Classroom Management Tools',
    'Teacher Assignment and Role Management',
    'Classroom Details and Organization',
    'Notification System for Teachers',
  ];

  // func to render details for the selected category
  const renderCategoryDetails = (category) => {
    switch (category) {
      case 'Classroom Management Tools':
        // TODO: frontend ui for CRUD operations for classrooms
        return (
          <div className="classroom-management">
            <div className="category-title">Classroom Management Tools</div>
            <div className="category-content">
              <div className="new-classroom">
                <h3 className="add-classroom-title">Create New Classroom</h3>
                <ClassroomForm onSubmit={handleCreateClassroom} />
              </div>
              <div className="new-classroom">
                <h3 className="add-classroom-title">Existing Classrooms:</h3>
                <ul>
                  {classrooms.map((classroom) => (
                    <li key={classroom.id}>
                      {classroom.name}
                      <button
                        className="classroom-delete-btn"
                        onClick={() => handleDeleteClassroom(classroom.id)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      case 'Teacher Assignment and Role Management':
        // TODO: frontend ui for assigning teachers to classrooms and managing their roles
        return (
          <div className="category-content">
            <div className="category-title">
              Teacher Assignment and Role Management
            </div>
            {/* frontend ui for assigning and managing teacher roles here */}
          </div>
        );
      case 'Classroom Details and Organization':
        // TODO: frontend ui for displaying and organizing classroom details
        return (
          <div className="category-content">
            <div className="category-title">
              Classroom Details and Organization
            </div>
            {/* frontend ui for displaying classroom names, descriptions, and associated teachers and students here */}
          </div>
        );
      case 'Notification System for Teachers':
        // TODO: frontend ui for managing notifications sent to teachers
        return (
          <div className="category-content">
            <div className="category-title">
              Notification System for Teachers
            </div>
            {/* frontend ui for configuring and sending notifications to teachers here */}
          </div>
        );
      default:
        return (
          <div className="default-category">
            Select a category to see more options
          </div>
        );
    }
  };

  return (
    <div className="moderation-teacher-container">
      <div className="settings-categories">
        {settingsCategories.map((category) => (
          <div
            key={category}
            className={`category-item ${
              selectedCategory === category ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="settings-divider" />
      <div className="category-details">
        {renderCategoryDetails(selectedCategory)}
      </div>
    </div>
  );
};

export default ModerationAdmin;
