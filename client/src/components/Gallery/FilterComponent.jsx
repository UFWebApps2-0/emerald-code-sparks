import React, { useState } from 'react';
import './Filter.less';
import { debounce } from 'lodash';

const FilterComponent = ({ onFilterChange, loadedGalleryItems }) => {

  const [types, setTypes] = useState({
    Block: false,
    Lesson: false,
    Project: false,
  });

  const [visibility, setVisibility] = useState({
    Public: false,
    Organization: false,
    Classroom: false,
  });

  const handleTypeChange = (type) => {
    console.log('handleTypeChange called');
    console.log('Types before update:', types);
  
    let updatedTypes;

    setTypes((prevTypes) => {
      updatedTypes = { ...prevTypes, [type]: !prevTypes[type] };
      console.log('Types after update:', updatedTypes);
      return updatedTypes;
    });

    onFilterChange(updatedTypes, visibility, loadedGalleryItems);
  };
  
  const handleVisibilityChange = (option) => {
    console.log('handleVisibilityChange called');
    console.log('Visibility before update:', visibility);

    let updatedVisibility;
  
    setVisibility((prevVisibility) => {
      updatedVisibility = { ...prevVisibility, [option]: !prevVisibility[option] };
      console.log('Visibility after update:', updatedVisibility);
      return updatedVisibility;
    });

    onFilterChange(types, updatedVisibility, loadedGalleryItems);
    
  };

  return (
    <div className="filter-container">
      <h2>Filter By:</h2>
      <div className="filter-section">
        <h3>Type:</h3>
        <label>
          <input
            type="checkbox"
            checked={types.Block}
            onChange={() => handleTypeChange('Block')}
          />
          Block
        </label>
        <label>
          <input
            type="checkbox"
            checked={types.Lesson}
            onChange={() => handleTypeChange('Lesson')}
          />
          Lessons
        </label>
        <label>
          <input
            type="checkbox"
            checked={types.Project}
            onChange={() => handleTypeChange('Project')}
          />
          Projects
        </label>
      </div>
      <div className="filter-section">
        <h3>Visibility:</h3>
        <label>
          <input
            type="checkbox"
            checked={visibility.Public}
            onChange={() => handleVisibilityChange('Public')}
          />
          Public
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibility.Organization}
            onChange={() => handleVisibilityChange('Organization')}
          />
          Organization
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibility.Classroom}
            onChange={() => handleVisibilityChange('Classroom')}
          />
          Classroom
        </label>
      </div>
    </div>
  );
};

export default FilterComponent;
