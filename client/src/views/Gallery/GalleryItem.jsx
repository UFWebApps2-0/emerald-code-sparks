import React from 'react';
import { createPortal } from 'react-dom';
import ExpandedGalleryItem from './ExpandedGalleryItem';
import './GalleryItem.less';

//Wrapper item needs to be a useState for it to get dynamically rendered

const GalleryItem = () => {
    
    function handleShow(){
        const modalHolder = document.getElementById('gallery-modal-holder');
        if (modalHolder != undefined){

        }
        console.log('show');
        createPortal(<ExpandedGalleryItem />, document.getElementById('gallery-modal-holder'));
    }
    return (
        <>
        <div className='flex flex-row align-center justify-center'>
            <div className='galleryItem' onClick={() => {handleShow()}}>
                <div className='header'><div>Project Name</div></div>
                <img style={{ backgroundColor: 'red' }} />
                <div className='flex flex-row'>
                    <div className='flex flex-column'>
                        <p>Creator:</p>
                        <p>Creator Name</p>
                        <p>Posted:</p>
                        <p>Posted Date</p>
                    </div>
                    <div className='flex flex-column justify-end'>
                        <p>7  5</p>
                    </div>
                </div>
            </div>
        </div>
        <div id='gallery-modal-holder'></div>
        </>
    );
}

export default GalleryItem;