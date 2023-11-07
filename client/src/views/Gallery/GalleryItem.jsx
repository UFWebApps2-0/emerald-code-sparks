import React, { useState } from 'react';
import { Modal } from 'antd';
import './GalleryItem.less';
import Like from './like';

const GalleryItem = () => (
    <div className='container nav-padding'>
        <div className='flex flex-row align-center justify-center'>
            <div className='galleryItem'>
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
                    <Like> </Like>
                </div>
            </div>
            <div className='gallery-modal-holder'>
                <Modal
                    title={title}
                    open={visible}
                    onCancel={handleCancel}
                    width='50vw'
                >
                    <div className='flex flex-row'>
                        <div className='flex flex-column'>
                            <img className='ooIMG'></img>
                        </div>
                        <div className='flex flex-column'>
                            <DiscussionBoard/>
                        </div>

                    </div>
                </Modal>
            </div>
        </>
    );
}

export default GalleryItem;