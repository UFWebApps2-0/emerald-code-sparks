import React, { useState } from 'react';
import './Filter.less';
import { debounce } from 'lodash';

const FilterComponent = ({ onFilterChange, loadedGalleryItems }) => {

  //deboune lets us pause before doing the search to avoid unnecessary calls, improve performance
  // const [debouncedFilterUpdate] = useState(() => debounce(filterUpdate, 1000));
  // const input = useRef(null);

  // const handleChange = () => {
  //   debouncedFilterUpdate(input.current.input.value, loadedGalleryItems);
  // }

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
    console.log('handleTypeChange called');
    console.log('Types before update:', types);

    setTypes((prevTypes) => {
      const updatedTypes = { ...prevTypes, [type]: !prevTypes[type] };
      console.log('Types after update:', updatedTypes);
      return updatedTypes;
    });

    onFilterChange(types, visibility, loadedGalleryItems);

  };
  
  const handleVisibilityChange = (option) => {
    console.log('handleVisibilityChange called');
    console.log('Visibility before update:', visibility);
  
    setVisibility((prevVisibility) => {
      const updatedVisibility = { ...prevVisibility, [option]: !prevVisibility[option] };
      console.log('Visibility after update:', updatedVisibility);
      return updatedVisibility;
    });

    onFilterChange(types, visibility, loadedGalleryItems);
    
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
