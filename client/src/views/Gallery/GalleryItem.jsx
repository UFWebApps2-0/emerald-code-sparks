import React, { useState, useEffect } from "react";
import { Modal } from 'antd';
import './GalleryItem.less';


function GalleryItem({filterText, viewCountsRecord }) {
  const [viewCounts, setViewCounts] = useState(
    JSON.parse(localStorage.getItem("viewCounts")) || {}
  );

//viewCountsRecord should change to the real galleryItem data in the future.
  viewCountsRecord = viewCountsRecord.filter((records) => {
    return records.Name.toLowerCase().includes(filterText.toLowerCase()) || records.Creator.toLowerCase().includes(filterText.toLowerCase());
  });
  
  //pop up  
  const [visible, setVisible] = useState(false);
  //should change to the real title in the future
   const  [title,setTitle] = useState('Titlex');
	
	const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };
	
	const handleOk = () => {
        setVisible(false);
		alert(`Process or Display what happen if OK is clicked in the future.`);
    };
	

// The number of views of the clicked project increases by 1.
  const handleClicked = (directory) => {
	 
	 setTitle (directory.Name);
    const updatedViewCounts = { ...viewCounts };
    updatedViewCounts[directory.Id] = (updatedViewCounts[directory.Id] || 0) + 1;
    setViewCounts(updatedViewCounts);
	
	showModal();
	
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
			<div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'red', width: '150px', height: '100px' }}></div>
		  </div>

        <p >Creator: {directory.Creator}</p>
        <p>Posted Time: {directory.PostedTime}</p>
        <p>Views: {viewCounts[directory.Id] || 0}</p>
		<br/>
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
	  
	  <div className='gallery-modal-holder'>
                <Modal
                    title= {title}
                    open={visible}
                    onCancel={handleCancel}
					onOk={handleOk}
                    width='50vw'
                >
                    <div className='flex flex-row'>
                        <div className='flex flex-column'>
                            <img src="" alt = "Project Img" width="500" height="400" style={{ backgroundColor: 'red' }}/>
                        </div>
                    </div>
                </Modal>
            </div>
	  
    </div>
  );
}

export default GalleryItem;
