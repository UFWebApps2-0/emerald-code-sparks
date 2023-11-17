import React, { useState, useEffect } from 'react';
import shareImage from './share.png';
import thumbnailsImage from './thumbnails.png';
import { Modal } from 'antd';

function Share({props})
{  
	let shareLink = window.location.href; 
	const [visible, setVisible] = useState(false);
	const showModal = () => {
	setVisible(true);
	}
	
	const handleCancel = () => {
        setVisible(false);
    };

	function handleShare(e)
	{
		alert("share button is clicked");
		showModal();
	}
	
	function handleCopyClick() {
    const shareLinkCopy = document.createElement('textarea');
    shareLinkCopy.value = shareLink;
    document.body.appendChild(shareLinkCopy);
    shareLinkCopy.select();
    document.execCommand('copy');
    document.body.removeChild(shareLinkCopy);
    alert('Link copied to clipboard!');
}
	
	return(
	<>
		<button className="share-button" onClick={(e) => { handleShare(e) }}>
			<img src={shareImage} alt="Share" />
		</button>

		<div className='gallery-modal-holder'>
                <Modal
                    open={visible}
                    width='50vw'					
					onCancel={handleCancel}
                    maskClosable={false}
                    cancelText='Close'
					footer={null}
                >
                    <div className='flex flex-row'>
                        <div className='flex flex-column'>
                            <img src={thumbnailsImage} style={{ height: '200px' }} />
                        </div>
						<div className='flex flex-column'style={{'margin-left': '30px'}}>
                            <h1 style={{ fontSize: '32px' }}> ~~~ Code Sparks ~~~ </h1>
							<p style={{ fontSize: '20px' }}> Share your masterpiece with friends! </p>
							<p>Link: {shareLink}</p>
							<button onClick={handleCopyClick}>Copy the link! (Click)</button>
                        </div>
                    </div>
                </Modal>
            </div>
			</>	
	);
}export default Share;