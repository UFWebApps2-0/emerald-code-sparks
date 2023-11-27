import React, { useState } from 'react';
import '../Moderation/Moderation.css';

const ModerationTeacher = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const settingsCategories = [
    'Content Monitoring and Filtering',
    'Visibility and Oversight of Student Work',
    'Notification System',
  ];

  // func to render details for the selected category
  const renderCategoryDetails = (category) => {
    switch (category) {
      case 'Content Monitoring and Filtering':
        return (
          <div className="">
            <div className="category-title">Flagged Content</div>
          </div>
        );
      case 'Visibility and Oversight of Student Work':
        return (
          <div className="">
            <div className="category-title">Student Work</div>
          </div>
        );
      case 'Notification System':
        return (
          <div className="">
            <div className="category-title">Notifications</div>
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

export default ModerationTeacher;
