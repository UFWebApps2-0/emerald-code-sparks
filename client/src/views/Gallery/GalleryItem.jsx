import React, { useState, useEffect } from "react";
import axios from 'axios';
import './GalleryItem.less';

//I make this declaration look like what is in the bootcamp3. 
function GalleryItem() {
	
	//these declarations are what i have found from google search
	
	const path = './viewCountsRecord.JSON';





  const [viewCounts, setViewCounts] = useState(
    JSON.parse(localStorage.getItem("viewCounts")) || {}
  );


  // "0" should be changed in the future.
  const handleClicked = (id) => {
	   
	  const updatedViewCounts = { ...viewCounts };
	   updatedViewCounts[id] = (updatedViewCounts[id] || 0) + 1;
    //the number of views increase by 1
    setViewCounts(updatedViewCounts);

  };
  
  

  // This one is what i found from google search
  useEffect(() => {
    localStorage.setItem("viewCounts", JSON.stringify(viewCounts));
  }, [viewCounts]);




// The following is mostly from Spencer. I slightly modified it.
  return (
    <div className='container nav-padding'>
      <div className='flex flex-row align-center justify-center'>
        <div className='galleryItem' onClick={() => handleClicked(0)}>
          <div className='header'><div>Project Name</div></div>
          <img style={{ backgroundColor: 'red' }} />
          <div className='flex flex-row'>
            <div className='flex flex-column'>
              <p>Creator:</p>
              <p>Creator Name</p>
              <p>Posted:</p>
              <p>Posted Date</p>
              <p>Views: {viewCounts[0] || 0}</p>
            </div>
            <div className='flex flex-column justify-end'>
            </div>
          </div>
        </div>
		
		<div className='galleryItem' onClick={() => handleClicked(1)}>
          <div className='header'><div>Project Name</div></div>
          <img style={{ backgroundColor: 'red' }} />
          <div className='flex flex-row'>
            <div className='flex flex-column'>
              <p>Creator:</p>
              <p>Creator Name</p>
              <p>Posted:</p>
              <p>Posted Date</p>
              <p>Views: {viewCounts[1] || 0}</p>
            </div>
            <div className='flex flex-column justify-end'>
            </div>
          </div>
        </div>
		
		
		
      </div>
    </div>
  );
}

export default GalleryItem;


/*import React, { useState, useEffect } from "react";
import './GalleryItem.less';

function GalleryItem ()
{
	const [viewCounts, setViewCounts] = useState(
    JSON.parse(localStorage.getItem("viewCounts")) || {}
  );
  
  const handleClicked = () => {
    // Increment the view count for the clicked post
    setViewCounts((prevViewCounts) => ({
      ...prevViewCounts,
      0: (prevViewCounts[0] || 0) + 1,
    }));
  };
  
   // Save view counts to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("viewCounts", JSON.stringify(viewCounts));
  }, [viewCounts]);

  return
 (

    <div className='container nav-padding'>
        <div className='flex flex-row align-center justify-center'>
            <div className='galleryItem' onClick={() => handleClicked()}>
                <div className='header'><div>Project Name</div></div>
                <img style={{ backgroundColor: 'red' }} />
                <div className='flex flex-row'>
                    <div className='flex flex-column'>
                        <p>Creator:</p>
                        <p>Creator Name</p>
                        <p>Posted:</p>
                        <p>Posted Date</p>
						<p>Views: {viewCounts[0] || 0}</p>
                    </div>
                    <div className='flex flex-column justify-end'>
                        <p>7  5</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default GalleryItem;

*/