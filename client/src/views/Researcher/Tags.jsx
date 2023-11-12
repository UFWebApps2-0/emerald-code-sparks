import React, { useState } from 'react';
import './Tags.css';
// StudyItem Component
const StudyTag = ({ Study, Tag, removeItem, index }) => (
	<li>
	  {Tag}
	  <button onClick={() => removeItem(Study, Tag)}>X</button>
	</li>
  );

// StudyComponent Component
const StudyComponent = ({ Study, items, addItem, removeItem }) => {
	const [searchTerm, setSearchTerm] = useState('');
  
	const handleSearchChange = (e) => {
	  setSearchTerm(e.target.value);
	};
  
	const handleSearchKeyDown = (e) => {
		if (e.key === 'Enter' && e.target.value) {
		  const enteredTag = e.target.value;
		  const existingTag = filteredOptions.includes(enteredTag);
		  const alreadyAdded = items.includes(enteredTag);
		  if (existingTag && !alreadyAdded) {
			addItem(Study, enteredTag);
			e.target.value = '';
		  }
		}
	  };
  
	const filteredOptions = [
	  'Individual',
	  'Group',
	  'Extra',
	  // Add more options as needed
	].filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  
	return (
	  <div>
		<h2>{Study}</h2>
		<ul>
		  {items.map((item, index) => (
			<StudyTag key={index} Study={Study} Tag={item} removeItem={removeItem} />
		  ))}
		</ul>
		<input
		  type="text"
		  placeholder="Search tags..."
		  onChange={handleSearchChange}
		  onKeyDown={handleSearchKeyDown}
		/>
		<select
		onChange={(e) => {
			const selectedTag = e.target.value;
			if (selectedTag) {
			const alreadyAdded = items.includes(selectedTag);
			if (!alreadyAdded) {
				addItem(Study, selectedTag);
			}
			}
		}}
		>
		{filteredOptions.map((option) => (
			<option key={option} value={option}>
			{option}
			</option>
		))}
		</select>
	  </div>
	);
  };
  

// StudyList Component
const StudyList = () => {
  const [studies, setStudies] = useState({
    Study_1: []
  });

  const addTag = (Study, item) => {
    setStudies({
      ...studies,
      [Study]: [...studies[Study], item],
    });
  };

  const removeTag = (Study, item) => {
	const newStudies = { ...studies };
	newStudies[Study] = studies[Study].filter((i) => i !== item);
	setStudies(newStudies);
  };

  // 1* addStudy can be removed if implementing only preexisting studies
  const addStudy = (Study) => {
    if (!studies[Study]) {
      setStudies({
        ...studies,
        [Study]: [],
      });
    }
  };

  return (
    <div>
		<div className = "Main-Tag-Component">
			{Object.keys(studies).map((Study) => (
				<StudyComponent
					key={Study} 
					Study={Study} 
					items={studies[Study]} 
					addItem={addTag} 
					removeItem={removeTag} 
				/>
			))}
		</div>
			{/* 1* Remove this component if addStudy is removed */}
			<input 
				type="text"
				placeholder="Add Study"
				onKeyDown={(e) => {
					if (e.key === 'Enter' && e.target.value) {
						addStudy(e.target.value);
						e.target.value = '';
					}
				}}
			/>
	</div>
  );
};

export { StudyList };
