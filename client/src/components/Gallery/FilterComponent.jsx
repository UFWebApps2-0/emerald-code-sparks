import React, { useState } from 'react';
import './Filter.less';

const FilterComponent = ({ onFilterChange }) => {
  const [types, setTypes] = useState({
    block: false,
    lessons: false,
    projects: false,
  });

  const [visibility, setVisibility] = useState({
    public: false,
    organization: false,
    classroom: false,
  });

  const handleTypeChange = (type) => {
    setTypes({ ...types, [type]: !types[type] });
    onFilterChange(types, visibility);
  };

  const handleVisibilityChange = (option) => {
    setVisibility({ ...visibility, [option]: !visibility[option] });
    onFilterChange(types, visibility);
  };

  return (
    <div className="filter-container">
      <h2>Filter By:</h2>
      <div className="filter-section">
        <h3>Type:</h3>
        <label>
          <input
            type="checkbox"
            checked={types.block}
            onChange={() => handleTypeChange('block')}
          />
          Block
        </label>
        <label>
          <input
            type="checkbox"
            checked={types.lessons}
            onChange={() => handleTypeChange('lessons')}
          />
          Lessons
        </label>
        <label>
          <input
            type="checkbox"
            checked={types.projects}
            onChange={() => handleTypeChange('projects')}
          />
          Projects
        </label>
      </div>
      <div className="filter-section">
        <h3>Visibility:</h3>
        <label>
          <input
            type="checkbox"
            checked={visibility.public}
            onChange={() => handleVisibilityChange('public')}
          />
          Public
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibility.organization}
            onChange={() => handleVisibilityChange('organization')}
          />
          Organization
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibility.classroom}
            onChange={() => handleVisibilityChange('classroom')}
          />
          Classroom
        </label>
      </div>
    </div>
  );
};

export default FilterComponent;
