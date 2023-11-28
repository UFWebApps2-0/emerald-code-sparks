import React, { useState } from 'react';
import './Tags.css';
// StudyItem Component
const StudyTag = ({ Study, Tag, removeTagCallback, index }) => {
	return(	
	  <li>
		{Tag}
		<button onClick={() => removeTagCallback(Study, Tag)}>X</button>
	  </li>
	)
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
					removeTagCallback={removeTag} 
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
