import React, { useState, useEffect } from "react";
import './GalleryItem.less';


function GalleryItem({ filterText, viewCountsRecord }) {
  const [viewCounts, setViewCounts] = useState(
    JSON.parse(localStorage.getItem("viewCounts")) || {}
  );

//viewCountsRecord should change to the real galleryItem data in the future.
  viewCountsRecord = viewCountsRecord.filter((records) => {
    return records.Name.toLowerCase().includes(filterText.toLowerCase()) || records.Creator.toLowerCase().includes(filterText.toLowerCase());
  });

// The number of views of the clicked project increases by 1.
  const handleClicked = (directory) => {
    const updatedViewCounts = { ...viewCounts };
    updatedViewCounts[directory.Id] = (updatedViewCounts[directory.Id] || 0) + 1;
    setViewCounts(updatedViewCounts);
  };

  useEffect(() => {
    localStorage.setItem("viewCounts", JSON.stringify(viewCounts));
  }, [viewCounts]);


//Detect if the project is clicked. 
//should change the red block to the img of galleryItem in the future.
  const recordList = viewCountsRecord.map((directory) => {
    return (
	
	<div key={directory.Id} onClick={() => handleClicked(directory)}>
	<div className='header'><div>{directory.Name}</div></div>
          <div style={{ backgroundColor: 'red', width: '100px', height: '100px' }}></div>

        <p >Creator: {directory.Creator}</p>
        <p>Posted Time: {directory.PostedTime}</p>
        <p>Views: {viewCounts[directory.Id] || 0}</p>
      </div>
	  
    );
  });

//in-line CSS is created by Spencer.
  return (
    <div className='container nav-padding'>
      <div className='flex flex-row align-center justify-center'>
        <div className='galleryItem'>
          {recordList}
        </div>
      </div>
    </div>
  );
}

export default GalleryItem;
